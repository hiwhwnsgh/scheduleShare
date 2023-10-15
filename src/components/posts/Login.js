import React, { useState } from "react";
import '../../styles/Login.scss';
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import { useDispatch } from 'react-redux';
import axios from "axios";
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

function Login() {
  const [modalIsOpen,setModalIsOpen] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async() => {
    await axios.post('/login', { loginId, password }).then(response=>{
      // 로그인 성공 후 리다이렉트 또는 상태 업데이트 등을 수행
      const data = response.data;
      if(data === '로그인 아이디 또는 비밀번호가 틀렸습니다.'){
        setModalIsOpen(true);
        return;
      }
      dispatch(login(data));
      navigate('/community');
    }).catch(error=>{
      console.log(error);
    });
    
  };
  const closeModal = () =>{
    setModalIsOpen(false);
  }
  const handleEnterPress = (e) =>{
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  }
  return (
    <div className="login-container">
        <div className="login-form">
          <h2>로그인</h2>
          <input
            type="text"
            placeholder="id"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <input
            type="password"
            onKeyDown={handleEnterPress}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginBtn" type="submit" onClick={handleLogin}>로그인</button>
          <Link to={'/register'}><button className="registerBtn">회원가입</button></Link>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="모달"
          >
              <div style={{display:"flex",flexDirection:"column"}}>
              <h3 style={{marginBottom:"1rem",marginTop:"3rem"}}>아이디 또는 비밀번호가 틀렸습니다.</h3>
              <button style={{marginTop:"3.5rem"}}onClick={closeModal}>닫기</button>
              </div>
        </Modal>
    </div>
  );
}

export default Login;
