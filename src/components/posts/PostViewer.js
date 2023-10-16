import styled from "styled-components";
import palette from "../../styles/palette";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {DotLoader} from 'react-spinners';
import Modal from 'react-modal';
import { URL_BackEnd } from "../../utils/constants";

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

const PostViewerBlock = styled.div`
    padding-left: 2rem;
    padding-right: 2rem;
    width 1024px;
    margin: 0 auto; /* 중앙 정렬 */

    /* 브라우저 크기에 따라 가로 크기 변경 */
    @media (max-width: 1024px){
        width: 768px;
    }
    @media (max-width: 768px){
        width: 100%;
    }
    margin-top: 4rem;
`;
const PostHead= styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    h1 {
        font-size: 3rem;
        line-height: 1.5;
        margin: 0;
    }
`;

const SubInfo = styled.div`
    margin-top: 1rem;
    color: ${palette.gray[6]}

    span + span : before {
        color: ${palette.gray[5]}
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: '\\B7'; /* 가운뎃 점 문자 */
    }
`;

const Tags = styled.div`
    margin-top: 0.5rem;
    .tag {
        display: inline-block;
        color: ${palette.cyan[7]};
        text-decoration: none;
        margin-right: 0.5rem;
    }
    &:hover {
        color: ${palette.cyan[6]};
    }
`

const PostContent = styled.div`
    font-size: 1.3125rem;
    color: ${palette.gray[8]};
    height: 500px;
`

const PostViewer = () => {
    const {id} = useParams();
    const [data,setData] = useState({});
    const [loading,setLoading] = useState(true);
    const [isCheck,setIsCheck] = useState(true);
    const [Participation,setParticipation] = useState();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const navigate = useNavigate();
    const loginId = useSelector(state=>state.user.loginId);
    const nickname = useSelector(state=>state.user.nickname);
    const isLogined = useSelector(state=>!state.auth.token);
    const formatDate = ( date )=>{
        return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`; // 브라우저의 로캘에 따른 형식
    }
    const closeModal = () => {
        setModalIsOpen(false);
        navigate(-1);
    };
    const handleClickApplication = async () =>{
        axios.post(`http://${URL_BackEnd}/post/${id}/${loginId}`).then(response=>{
            setModalIsOpen(true);
            setParticipation(response.data);
        }).catch(error => {
            console.log(error);
        }
        )
        
    }
    const handleClickCancle = () => {
        navigate(-1);
    }
    
    useEffect(() => {
        axios
          .get(`http://${URL_BackEnd}/post/${id}`)
          .then((response) => {
            setLoading(false);
            const data = response.data;
            setData({
                id: data.id,
                title: data.title,
                content : data.content,
                nickname : data.nickname,
                registrationDate : formatDate(new Date(data.registrationDate)),
                startDate : formatDate(new Date(data.startDate)),
                endDate : formatDate(new Date(data.endDate)),
                tags : data.tags,
            });
            
            if (nickname === response.data.nickname) {
              setIsCheck(false);
            }
            if (isLogined) {
              setIsCheck(false);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }, [id, nickname, isLogined]);
    return (
        <div>
            {
                loading ?
                <div style={{display:"flex",justifyContent:"center"}}>
                    <DotLoader color="#36d7b7" speedMultiplier="2"/>
                </div>
                 : 
                 <PostViewerBlock>
                 <PostHead>
                     <h1>{data.title}</h1>
                     <SubInfo>
                         <p>
                             <b>{data.nickname}</b>
                         </p>
                         <div>
                            <span>개설일 : </span>
                            <span>{data.registrationDate}</span>
                         </div>
                     </SubInfo>
                     <div>
                        <span>기간 : </span>
                        <span>{data.startDate}</span>
                        <span>~</span>
                        <span>{data.endDate}</span>
                     </div>
                     
                     <Tags>
                         {data.tags && data.tags.map(tag=>(
                             <div key={tag.id} className="tag">#{tag.name}</div>
                         ))}
                     </Tags>
                     
                 </PostHead>
                 <PostContent dangerouslySetInnerHTML={{__html:  `${data.content}`}}/>
                 {
                     isCheck && 
                     <div>
                        <div style={{display:"flex",justifyContent:"flex-end"}}>
                            <button style={{padding:"10px",paddingLeft:"4rem",paddingRight:"4rem",fontSize:"16px"}} onClick={handleClickApplication}>참가</button>
                            <button style={{padding:"10px",paddingLeft:"4rem",paddingRight:"4rem",background:"#9b9a9a",fontSize:"16px"}} onClick={handleClickCancle}>취소</button>
                        </div>
                        <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="모달"
                        >
                            <div style={{display:"flex",flexDirection:"column"}}>
                            <h3 style={{marginBottom:"1rem",marginTop:"3rem"}}>{Participation}</h3>
                            <button style={{marginTop:"3.5rem"}}onClick={closeModal}>닫기</button>
                            </div>
                        </Modal>
                     </div>
                     
                     
                 }
                 </PostViewerBlock>
            }
        </div>
        
    )
}

export default PostViewer;