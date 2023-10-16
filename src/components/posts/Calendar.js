import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/Calender.scss'; // SCSS 파일 import
import { useDispatch, useSelector } from 'react-redux';
import {DotLoader} from 'react-spinners';
import axios from 'axios';
import Modal from 'react-modal';
import Tags from '../common/Tags';
//import { MdArrowBack,MdArrowForward } from "react-icons/md";
import BigCalender from '../common/BigCalendar';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { setUser } from '../../store/userSlice';
import { login } from '../../store/authSlice';
import useAuthEffect from '../../utils/auth';


const customStyles = {
  content: {
    width: "360px",
    height: "250px",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    justifyContent: "center",
    overflow: "auto",
  },
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
};
const ModalWindow = styled.div`
  height: "250px"
  overflow-y: scroll;
  -ms-overflow-style: none;  /*IE, Edge*/
  scrollbar-width: none; /*Firefox*/
  ::-webkit-scrollbar {
    display: none; /*Chrome, Safari, Opera*/
    width: 0px;
`
const ModalBtn = styled.button`
  background : #007bff;
  color : white;
  borderRadius: 4px;
`
Modal.setAppElement('#root'); // 모달이 열릴 때, 화면 리더기에 보이지 않게 하기 위해 필요

function Calendar() {
  const dispatch = useDispatch();
  const userId = useSelector(state=>state.user.userId);
  const loginId = useSelector(state=>state.user.loginId);
  const [memoList, setMemoList] = useState([]); // 메모 데이터를 저장할 상태
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState(null); // 선택한 메모의 상태
  const [isUpload,setIsUpload] = useState(false);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  useAuthEffect();
  
  const openModal = (memo) => {
    setModalIsOpen(true);
    setSelectedMemo(memo); // 선택한 메모를 설정
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedMemo(null); // 모달이 닫힐 때 선택한 메모 초기화
  };

  const darkenColor = (color, factor) => {
    // 색상 문자열을 16진수 RGB 값으로 파싱
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
  
    // RGB 값을 어둡게 만듭니다.
    const darkR = Math.round(r * factor);
    const darkG = Math.round(g * factor);
    const darkB = Math.round(b * factor);
  
    // 어두운 RGB 값을 16진수 문자열로 변환하고 #을 앞에 추가합니다.
    const darkColor = `#${darkR.toString(16).padStart(2, '0')}${darkG.toString(16).padStart(2, '0')}${darkB.toString(16).padStart(2, '0')}`;
  
    return darkColor;
  }

  const getMemoItemColor = useCallback((memoItem, factor) => {
    const uniqueKey = `${memoItem.id}-${memoItem.title}`;
    let hash = 0;
    for (let i = 0; i < uniqueKey.length; i++) {
      hash = (hash << 5) - hash + uniqueKey.charCodeAt(i);
    }
    const color = `#${((hash >> 0) & 0xFFFFFF).toString(16).padStart(6, '0')}`;
    return darkenColor(color, factor);
  }, []);
  //  style={{ backgroundColor: getMemoItemColor(memoItem, 0.6) }}
  useEffect(()=>{
    if(userId){
      axios.get(`/schedule/${userId}`).then(response=>{
        const posts = response.data;
        setMemoList(posts.map((post) => ({
          id: post.id,
          title: post.title,
          content: post.content,
          startDate: new Date(post.startDate),
          endDate: new Date(post.endDate),
          tags: post.tags,
          color : getMemoItemColor(post,0.6)
        })));
        setIsUpload(true);
      }).catch(error=>{
        console.log(error)
      })
    }
  },[getMemoItemColor, userId])
return (
  <div>
    {
      !isUpload ?
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'750px'}}>
          <DotLoader color="#36d7b7" speedMultiplier="2" /> 
        </div>
        :
        <div>
          <BigCalender postList={memoList}openModal={openModal}/>
        </div>
    }
    {selectedMemo && ( // 선택한 메모가 있을 때만 모달을 렌더링
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="모달"
      >
        <ModalWindow>
          <h2>{selectedMemo.title}</h2>
          <p>{selectedMemo.startDate.toLocaleString('ko-KR', options)} ~ {selectedMemo.endDate.toLocaleString('ko-KR', options)}</p>
          <div dangerouslySetInnerHTML={{ __html: selectedMemo.content }}></div>
          {selectedMemo.tags &&
            <Tags tags={selectedMemo.tags}></Tags>
          }
          <div style={{display:'flex',justifyContent:'center',marginTop:'4rem'}}>
            <Link to={`/chat/?loginId=${loginId}&page=${selectedMemo.id }`}><ModalBtn>참여</ModalBtn></Link>
            <ModalBtn onClick={closeModal}>닫기</ModalBtn>
          </div>
        </ModalWindow>
      </Modal>
    )}
  </div>
);
}

export default Calendar;
