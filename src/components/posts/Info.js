import styled from 'styled-components';
import '../../styles/PostList.scss';
import SubInfo from '../common/SubInfo';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Tags from '../common/Tags';
import Pagination from 'react-js-pagination';
import { URL_BackEnd } from '../../utils/constants';

const StyledDiv = styled.div`
    display: flex;
    width:100%;
    justify-content: space-between;
    align-items: center;
    background: #ccc;
    border: 2px solid #e7e7e7;
    padding: 4px 0 4px;
    margin : 0;
    /* 클래스 이름을 "button" 대신 "btn"으로 변경 */
    button {
        background: #585858;
        margin: 5px;
    }
`

const Info = () =>{
    const {loginId} = useParams();
    const [posts,setPost] = useState([]);
    const [users,setUsers] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [activePage, setActivePage] = useState(1);
    const [itemsPerPage] = useState(10); // 페이지당 아이템 수
    const navigate = useNavigate();
    const indexOfLastPost = activePage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const totalItemsCount = posts.length;
    const formatDate = ( date )=>{
        const newDate = new Date(date);
        return `${newDate.getFullYear()}.${(newDate.getMonth() + 1).toString().padStart(2, '0')}.${newDate.getDate().toString().padStart(2, '0')}`; // 브라우저의 로캘에 따른 형식
    }
    
    

    const handlePageChange = (page) => {
        setActivePage(page);
        navigate(`/info/${loginId}/?page=${page}`)
      };
    useEffect(() => {
    axios.get(`http://${URL_BackEnd}/info/${loginId}`).then(response => {
        setPost(response.data);
    }).catch(error => {
        console.log(error);
    });
}, [loginId]);
    const toggleSelectedPost = (postId) => {
        if (selectedPostId === postId) {
            setSelectedPostId(null);
        } else {
            setSelectedPostId(postId);
            axios.get(`http://${URL_BackEnd}/info/${loginId}/${postId}`).then(response=>{
                setUsers(response.data);
            }).catch(error=>{
                console.log(error);
            })
            
        }
    };
    const handleAccept = useCallback((postId, userId) => {
        // 수락 버튼 클릭 시 서버로 요청을 보냅니다.
        axios.put(`http://${URL_BackEnd}/info/acceptRequest`, { postId, userId }) // postId와 userId를 적절한 값으로 대체
            .then((response) => {
                toggleSelectedPost(postId);
                
            })
            .catch((error) => {
                console.error(error);
            });
    },[]);
    
    const handleReject = useCallback((postId, userId) => {
        // 거절 버튼 클릭 시 서버로 요청을 보냅니다.
        axios.put(`http://${URL_BackEnd}/info/rejectRequest`,  { postId, userId }) // postId와 userId를 적절한 값으로 대체
            .then((response) => {
                toggleSelectedPost(postId);
            })
            .catch((error) => {
                console.error(error);
            });
    },[]);
    return(
        <div style={{width:'65%'}}>
            {
                currentPosts.map((post)=>
                <div key={post.id}>
                    <div onClick={()=>toggleSelectedPost(post.id)}>
                        <div  >
                            <div className='listItem' >
                                <h2>{post.title}</h2>
                                <SubInfo username={post.nickname} publishedDate={post.registrationDate}/>
                                <span>시작일 : {formatDate(post.startDate)} ~ 종료일 : {formatDate(post.endDate)}</span>
                                <Tags tags={post.tags}></Tags>
                            </div>   
                            <hr/>
                        </div>
                    </div>
                    {selectedPostId === post.id && (
                        <div>
                            {
                                users && users.map((user)=>
                                    <StyledDiv key={user.id}>
                                        <SubInfo username={user.nickname} publishedDate={new Date(user.applicationDate)} />
                                        <div>
                                            <button onClick={()=>handleAccept(post.id,user.id)}>수락</button>
                                            <button onClick={()=>handleReject(post.id,user.id)}>거절</button>
                                        </div>
                                    </StyledDiv>
                                )
                            }
                            

                        </div>
                        
                    )}
                    
                </div>
                )
            }
            <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={handlePageChange}
            />
        </div>
    )
}

export default Info;