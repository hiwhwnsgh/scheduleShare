import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import {  Stomp } from '@stomp/stompjs';
import { useLocation } from 'react-router-dom';
import '../../styles/Chat.scss';
import { MdSend } from "react-icons/md";
import {DotLoader} from 'react-spinners';
import axios from 'axios';
import { URL_BackEnd } from '../../utils/constants';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [isSubcribe, setIsSubcribe] = useState(false);
  const userId = useSelector(state=>state.user.userId);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const loginId = queryParams.get("loginId");
  const page = queryParams.get("page")
  const scrollContainerRef = useRef(null);
  const options = { year: "2-digit", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"}

  useEffect(() => {
    // 스크롤 가능한 컨테이너 요소에 접근
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      // 스크롤 위치를 맨 아래로 이동
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, []);
  useEffect(()=>{
    axios.get(`http://${URL_BackEnd}/chat/messages?loginId=${loginId}&page=${page}`).then(response=>{  
      setMessages(response.data);
    }).catch(error=>{

    })
  },[])
  useEffect(() => {
    const serverUrl = `http://${URL_BackEnd}/chat`;

    const initializeStompClient = () =>{
      const socket = new SockJS(serverUrl);
      const client = Stomp.over(socket);

      client.connect(
        {},
        (frame) => {
          client.subscribe(`/topic/${page}`, (e) => {
            const newMessage = JSON.parse(e.body);
            showMessage(newMessage);
          });
          setIsSubcribe(true);
          setStompClient(client);
        },
        (error) => {
          // 재시도 로직 추가
          setTimeout(() => {
            initializeStompClient();
          }, 3000); // 5초 후에 재시도
        }
      );
    }
    try{
    // 초기 연결 설정
    initializeStompClient();
    } catch(error){
      initializeStompClient();
    }
    // Clean up on unmount
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  const showMessage = (data) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  };

  const handleSendMessage = () => {
    if (stompClient && message) {
      const data = {
        userId: userId,
        postId: page,
        content: message,
      };
      stompClient.send('/sendChat', {}, JSON.stringify(data));
      setMessage('');
    }
  };
  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const containerStyle = {
    overflowY: isSubcribe ? 'scroll' : 'hidden',
  };
  return (
    
    <div>
      {isSubcribe ?
        <div className='chat-container'>
        <div className='chat-header'>채팅방</div>
          <div className='chat-messages' ref={scrollContainerRef} style={containerStyle}>
            {messages.map((message, index) => {

                const date = new Date(message.createdAt);
                const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
                if(message.loginId !== loginId){
                  
                  return(
                    <div key={index} className='anotherMsg'>
                      <div>
                        <span className='anotherName'>{message.nickName}</span>
                        <p className='styleDate'>{formattedDate}</p>
                        <p className='msg'>{message.content}</p>
                        
                      </div>
                    </div>
                  )
                }
                else{
                  return(
                    <div key={index} className='myMsg'>
                      <p className='styleDate'>{formattedDate}</p>
                      <p className='msg'>{message.content}</p>
                      
                    </div>
                  )
                }
              
              }
            )}
          </div>
          <div className='input-container'>
            <input
              type='text'
              onKeyDown={handleEnterPress}
              className='message'
              value={message}
              autoComplete="off"
              size="20"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}><MdSend/></button>
        </div>
    </div>
        :
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',width: '100%',height:'750px',flexDirection:'column'}}>
        <DotLoader color="#36d7b7" speedMultiplier="2"/>
      </div> 
      }
    </div>
  );
}

export default ChatComponent;
