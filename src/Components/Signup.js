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
          <div className="signup-close-button-container">
            <div className="signup-close">
              <button onClick={onSignupClose} className="round-button">
                x
              </button>
            </div>
            {children}
          </div>
          <div className="form-container">
            <h3>GET STARTED</h3>
            <p>
              By clicking Log In, you agree to our <a href="">Terms</a>. Learn
              how we process your data in our <a href="">Privacy Policy</a> and{" "}
              <a href="">Cookie Policy</a>.
            </p>
            <input placeholder="Email" htmlFor="email" id="email" />
            <input placeholder="Password" htmlFor="password" id="password" />
            <button onClick={createUser} className="signup-button">
              Sign up
            </button>
          </div>
          <hr className="or-hr" />
          <p className="login-link">
            Have an account? <a href="">Log in</a>
          </p>
          <div>
            <h3>GET THE APP!</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
