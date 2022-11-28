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
        <section className="signup-popup">
          <button onClick={onSignupClose}>X</button>
          {children}
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
        </section>
      </div>
    </>
  );
};

export default Signup;
