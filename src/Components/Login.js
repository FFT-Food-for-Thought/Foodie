import React from "react";
import "../Css/login.css";

const Login = ({ open, children, onClose }) => {
  if (!open) return null;

  return (
    <>
      <div className="popup-overlay"></div>
      <div className="login-popup">
        <button onClick={onClose}>X</button>
        {children}
        <input placeholder="Email" />
        <input placeholder="Password" />
        <button>Log In</button>
        <h3>or</h3>
        <button>Trouble Loggin In?</button>
        <h3>GET THE APP!</h3>
      </div>
    </>
  );
};

export default Login;
