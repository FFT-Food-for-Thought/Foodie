import React from "react";
import "../Css/signup.css";
import { signup } from "../db/signup";
import { auth } from "../db/signup";

const Signup = ({ openSignup, children, onSignupClose }) => {
  const createUser = () => {
    const email = document.getElementById("email").value;
    const pw = document.getElementById("password").value;
    signup(email, pw);
  };

  if (!openSignup) return null;
  return (
    <>
      <div className="popup-overlay">
        <div className="signup-popup">
          <div className="signup-close">
            <button onClick={onSignupClose} className="round-button">
              x
            </button>
          </div>
          {children}
          <div className="form-container">
            <h3>GET STARTED</h3>
            <p>
              By clicking Log In, you agree to our <a href="">Terms</a>. Learn
              how we process your data in our <a href="">Privacy Policy</a> and{" "}
              <a href="">Cookie Policy</a>.
            </p>
            <input placeholder="Email" htmlFor="email" className="form-input" />
            <input placeholder="First Name" className="form-input" />
            <input placeholder="Last Name" className="form-input" />
            <input placeholder="Username" className="form-input" />
            <input placeholder="Password" htmlFor="password" id="password" />
            <button onClick={createUser} className="signup-button">
              Sign up
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
          <p className="login-link">
            Have an account? <a href="">Log in</a>
          </p>
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
      </div>
    </>
  );
};

export default Signup;
