import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // 여기에 로그인 처리 로직을 추가합니다.
    // 실제로는 서버로 로그인 요청을 보내고 인증을 수행해야 합니다.
    // 이 예제에서는 단순히 username과 password가 일치하면 로그인 성공으로 간주합니다.
    if (username === "user" && password === "password") {
      setLoggedIn(true);
    }
  };

  return (
    <div className="login-container">
      {loggedIn ? (
        <div className="welcome-message">
          <h2>Welcome, {username}!</h2>
          <p>You are now logged in.</p>
        </div>
      ) : (
        <div className="login-form">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Log In</button>
        </div>
      )}
    </div>
  );
}

export default Login;
