import React from "react";
import "../Css/login.css";
import { login } from "../db/signup";
import { useNavigate } from "react-router-dom";
import { auth } from "../db/signup";
import { onAuthStateChanged } from "firebase/auth";

const Login = ({ open, children, onClose }) => {
  const navigate = useNavigate();

  const _login = () => {
    const email = document.getElementById("loginEmail").value;
    const pw = document.getElementById("loginPassword").value;

    login(email, pw);
    onAuthStateChanged(auth, function (user) {
      if (user) {
        navigate("/profile");
      } else {
        // No user is signed in.
      }
    });
  };

  if (!open) return null;

  return (
    <>
      <div className="login-popup">
        <button onClick={onClose}>X</button>
        {children}
        <input placeholder="Email" id="loginEmail" />
        <input placeholder="Password" id="loginPassword" />
        <button onClick={_login}>Log In</button>
        <h3>or</h3>
        <button>Trouble Loggin In?</button>
        <h3>GET THE APP!</h3>
      </div>
    </>
  );
};

export default Login;
