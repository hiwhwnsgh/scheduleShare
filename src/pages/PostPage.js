import { Link, useNavigate} from "react-router-dom";
import PostList from "../components/posts/PostList";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../store/userSlice";
import { useEffect, useState } from "react";
import '../styles/Paging.scss';
import Pagination from "react-js-pagination";
import { login, logout } from "../store/authSlice";
import '../styles/WriteButton.scss';
import Modal from 'react-modal';
import { DotLoader } from "react-spinners";
import useAuthEffect from "../utils/auth";

const customStyles = {
    content: {
        width: "360px",
        height: "180px",
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
        display:"flex",
        alignContent:"center"
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
Modal.setAppElement('#root'); // 모달이 열릴 때, 화면 리더기에 보이지 않게 하기 위해 필요

const WritePostDiv = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
    margin-right: 10rem;  
`;
const PostPage = () => {
    const isLogin = useSelector((state)=>!!state.auth.token);
    const [activePage, setActivePage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginId = useSelector(state=>state.user.loginId);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isCommunity,setIsCommunity] = useState(false);
    const handlePageChange = (page) => {
        setActivePage(page);
        navigate(`/community?page=${page}`)
      };
    const handleLogout = () =>{
        dispatch(clearUser());
        dispatch(logout());
        localStorage.setItem('authToken','');
    }
    const closeModal = () => {
        setModalIsOpen(false);
    };
    const handleWriteClick = () => {
        if(isLogin){
            <Link to={'/writepost'}></Link>
        }
        else{
            setModalIsOpen(true);
        }
    }

    useAuthEffect();
      

    const [itemsPerPage] = useState(10); // 페이지당 아이템 수
    
    const [postList,setPostList] = useState([]);
    
    useEffect(()=>{
        axios.get(`/community`)
        .then((response)=>{
            setPostList(response.data);
            setIsCommunity(true);
        }).catch(error=>{
            console.log(error);
        })
    },[]);
    const indexOfLastPost = activePage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);
    const totalItemsCount = postList.length;

    return(
        <div>
            <WritePostDiv>
            {
                loginId ? 
                <Link to={'/writepost'}><button>작성하기</button></Link>
                :
                <button onClick={handleWriteClick}>작성하기</button>
            }
            {
                !isLogin && 
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="모달"
                >
                    <div style={{display:"flex",flexDirection:"column"}}>
                    <h3 style={{marginBottom:"1rem",marginTop:"3rem"}}>로그인 먼저 해주세요</h3>
                    <button style={{marginTop:"3.5rem"}}onClick={closeModal}>닫기</button>
                    </div>
                </Modal>
            }
            {
                loginId ? 
                <button onClick={handleLogout}>로그아웃</button>
                :
                <Link to={'/login'}><button>로그인</button></Link>
            }
            
            <Link to={`/info/${loginId}`}><button>내 게시글 목록</button></Link>
            </WritePostDiv>
            {isCommunity ? 
                <div style={{display:"flex",justifyContent:"center"}}>
                    <PostList postList={currentPosts}/>
                </div>
                :
                <div style={{display:"flex",justifyContent:"center",alignItems:'center',width:'100%',height:'650px'}}>
                    <DotLoader color="#36d7b7" speedMultiplier="2"/>
                </div>
                

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
export default PostPage;