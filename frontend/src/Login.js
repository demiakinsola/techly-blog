import React from 'react'
import api from './api/postsApi';
import { useNavigate } from "react-router-dom";

const Login = ({ email, setEmail, password, setPassword }) => {

const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault()
    const user = {
        email: email,
        password: password
    }
    try {
           const response = await api.post('/login', user);
           console.log(response);
            setEmail('');
            setPassword('');
            navigate('/');
    } catch(err) {
        console.log(err.response);
         if (err.response.status === 404) {
           setEmail("");
           setPassword("");
           alert("User does not exist");
         }
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <label
          style={{ marginTop: "1rem", marginLeft: "1.5rem" }}
          htmlFor="email"
        >
          Email Address
        </label>
        <input
          type="email"
          style={{
            marginTop: "0.5rem",
            display: "block",
            marginLeft: "1.5rem",
            width: "50%",
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label
          style={{ marginTop: "1rem", marginLeft: "1.5rem" }}
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          style={{
            marginTop: "0.5rem",
            display: "block",
            marginLeft: "1.5rem",
            width: "50%",
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          style={{
            marginTop: "1.5rem",
            display: "block",
            marginLeft: "1.5rem",
            width: "50%",
            marginBottom: "1rem",
          }}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Login