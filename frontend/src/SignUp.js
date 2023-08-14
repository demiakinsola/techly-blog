import React from 'react';
import api from "./api/postsApi";
import { useNavigate } from "react-router-dom";

const SignUp = ({ name, setName, email, setEmail, password, setPassword }) => {

const navigate = useNavigate();

const handleSignUp = async (e) => {
  e.preventDefault();
  const user = {
    fullName: name,
    email: email,
    password: password,
  };
  try {
    await api.post("/create-account", user);
    setName("");
    setEmail("");
    setPassword("");
    navigate("/");
  } catch (err) {
    console.log(err.message);
    if (err.response.status === 409) {
      setName("");
      setEmail("");
      setPassword("");
      alert("User already exists");
    }
  }
};

  return (
    <>
      <form onSubmit={handleSignUp}>
        <label
          style={{ marginTop: "1rem", marginLeft: "1.5rem" }}
          htmlFor="fullName"
        >
          Full Name
        </label>
        <input
          type="text"
          required
          style={{
            marginTop: "0.5rem",
            display: "block",
            marginLeft: "1.5rem",
            width: "50%",
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label
          style={{ marginTop: "1rem", marginLeft: "1.5rem" }}
          htmlFor="email"
        >
          Email Address
        </label>
        <input
          type="email"
          required
          style={{
            marginTop: "0.5rem",
            display: "block",
            marginLeft: "1.5rem",
            width: "50%",
          }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label
          style={{ marginTop: "1rem", marginLeft: "1.5rem" }}
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          required
          style={{
            marginTop: "0.5rem",
            display: "block",
            marginLeft: "1.5rem",
            width: "50%",
          }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          Sign up
        </button>
      </form>
    </>
  );
}

export default SignUp