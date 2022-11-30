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
            By clicking Log In, you agree to our <a href="">Terms</a>. Learn how
            we process your data in our <a href="">Privacy Policy</a> and{" "}
            <a href="">Cookie Policy</a>.
          </p>
          <input placeholder="Email" id="loginEmail" />
          <input placeholder="Password" id="loginPassword" />
          <button onClick={_login} className="login-button">
            Log In
          </button>
        </div>
        <hr className="or-hr" />
        <div className="icons">
          <img
            src={require("../img/Google.png")}
            alt="Google icon"
            className="icon"
          />
          <img
            src={require("../img/Apple.png")}
            alt="Apple icon"
            className="icon"
          />
          <img
            src={require("../img/Facebook.png")}
            alt="Facebook icon"
            className="icon"
          />
        </div>
        <a href="">Trouble Loggin In?</a>
        <hr className="line-hr" />
        <h3>GET THE APP!</h3>
        <div className="apps-container">
          <img
            src={require("../img/DownloadOnTheAppStore.png")}
            alt="App Store icon"
            className="app-store"
          />
          <img
            src={require("../img/GooglePlay.png")}
            alt="Google Play icon"
            className="google-play"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
