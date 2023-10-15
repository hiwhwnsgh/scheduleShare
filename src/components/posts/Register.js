import { useState } from 'react';
import '../../styles/Register.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Modal.scss';
import Modal from 'react-modal';


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

const Register = () => {
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [modalText, setModalText] = useState();
    const [loginId,setLoginId] = useState(''); 
    const [name, setName] = useState("");
    const [nickname,setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck,setPasswordCheck] = useState('');
    const navigate  = useNavigate();
    const onClick =() =>{
        if(!loginId || !password || !name || !nickname || !passwordCheck){
            setModalIsOpen(true);
            setModalText('빈칸이 존재합니다.');
            return;
        }
        axios.post("/register",{loginId,name,nickname,password,passwordCheck}).then(response=>{
            const data = response.data;
            if(data==='로그인 아이디가 중복됩니다.' || data === '닉네임이 중복됩니다.' || data ==='비밀번호가 일치하지 않습니다.'){
                setModalIsOpen(true);
                setModalText(data);
                return;
            }
            navigate('/login');
            }
        )
        .catch(error => {
            // 오류 처리
            console.error('데이터 전송 중 오류 발생:', error);
            }
        )
    }
    const closeModal = () =>{
        setModalIsOpen(false);
        setModalText('');
    }
    return(
        <div className="register-container">
            <div className="register-form">
            <h2>회원가입</h2>
            <input
                type="text"
                placeholder="ID"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
            />
            <input
                type='text'
                placeholder='이름'
                value={name}
                onChange={(e)=>setName(e.target.value)}
            />
            <input
                type='text'
                placeholder='닉네임'
                value={nickname}
                onChange={(e)=>setNickname(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password Check"
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <button onClick={onClick}>회원가입</button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="모달"
                >
                    <div style={{display:"flex",flexDirection:"column"}}>
                    <h3 style={{marginBottom:"1rem",marginTop:"3rem"}}>{modalText}</h3>
                    <button style={{marginTop:"3.5rem"}}onClick={closeModal}>닫기</button>
                    </div>
            </Modal>
            
        
        </div>
    );
}

export default Register;