import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "../Css/home.css";
import Footer from "./Footer";
import { logout } from "../db/signup";

const Home = () => {
  const [isLoginOpen, setLoginIsOpen] = useState(false);
  const [isSignupOpen, setSignupIsOpen] = useState(false);
  return (
    <React.Fragment>
      <div className="nav-page">
        <div className="navbar-container">
          <div className="navbar">
            <div className="navbar-left">
              <a href="/" className="nav-link">
                Foodi
              </a>
            </div>
          </div>
          <div className="navbar-right">
            <div className="login">
              <button
                className="login-button"
                onClick={() => setLoginIsOpen(true)}
              >
                Login
              </button>

              <Login
                open={isLoginOpen}
                onClose={() => setLoginIsOpen(false)}
              ></Login>
            </div>
          </div>
        </div>

        <div className="center-container">
          <span className="cycling">
            <h1 className="cycle"></h1>
          </span>

          <div className="create-account">
            <button
              className="create-account-link"
              onClick={() => setSignupIsOpen(true)}
            >
              Create Account
            </button>
            <Signup
              openSignup={isSignupOpen}
              onSignupClose={() => setSignupIsOpen(false)}
            ></Signup>
          </div>

          <div className="slogan">
            <h2>Connect with the perfect chef</h2>
            <h2>To eat the perfect meal!</h2>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
