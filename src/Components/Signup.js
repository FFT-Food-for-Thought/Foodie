import React from "react";
import "../Css/signup.css";
import { signup } from "../db/signup";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/signup";

const Signup = ({ openSignup, children, onSignupClose }) => {
  const navigate = useNavigate();
  const createUser = () => {
    const email = document.getElementById("email").value;
    const pw = document.getElementById("password").value;
    signup(email, pw);
    onAuthStateChanged(auth, function (user) {
      if (user) {
        navigate("/profile");
      } else {
        // No user is signed in.
      }
    });
  };

  if (!openSignup) return null;
  return (
    <>
      <div className="popup-overlay">
        <div className="signup-popup">
          <div className="signup-close-button-container">
            <div className="signup-close">
              <button onClick={onSignupClose}>X</button>
              {children}
            </div>
          </div>
          <div className="signup-info">
            <div>
              <p>Logo</p>
            </div>
            <div>
              <h1>Get Started</h1>
            </div>
            <div>
              <p>
                By clicking Log In, you agree to our Terms. Learn how we process
                your data in our Privacy Policy and Cookie Policy.
              </p>
            </div>
          </div>
          <div>
            <input placeholder="Email" htmlFor="email" id="email" />
          </div>
          <div>
            <input placeholder="Password" htmlFor="password" id="password" />
          </div>
          <div>
            <button onClick={createUser}>Sign Up</button>
          </div>
          <div>
            <h3>or</h3>
          </div>
          <div>
            <button>Trouble Loggin In?</button>
          </div>
          <div>
            <h3>GET THE APP!</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
