import React from "react";
import "../Css/login.css";
import { login } from "../db/signup";

const Login = ({ open, children, onClose }) => {
  const _login = () => {
    const email = document.getElementById("loginEmail").value;
    const pw = document.getElementById("loginPassword").value;

    login(email, pw);
  };

  if (!open) return null;

  return (
    <>
      <div className="popup-overlay"></div>
      <div className="login-popup">
        <div className="close-button">
          <button onClick={onClose} className="round-button">
            x
          </button>
        </div>
        {children}
        <div className="form-container">
          <h3>GET STARTED</h3>
          <p>
            By clicking Log In, you agree to our Terms. Learn how we process
            your data in our Privacy Policy and Cookie Policy.
          </p>
          <input placeholder="Email" id="loginEmail" />
          <input placeholder="Password" id="loginPassword" />
          <button onClick={_login} className="login-button">
            Log in
          </button>
        </div>
        <hr className="or-hr" />
        <button>Trouble Loggin In?</button>
        <h3>GET THE APP!</h3>
      </div>
    </>
  );
};

export default Login;
