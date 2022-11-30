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
                Foodie
              </a>
            </div>

            <div className="navbar-left">
              <a href="/about" className="nav-link">
                About
              </a>
            </div>

            <div className="navbar-left">
              <a href="/catering" className="nav-link">
                Catering
              </a>
            </div>

            <div className="navbar-left">
              <a href="/safety" className="nav-link">
                Safety
              </a>
            </div>
          </div>
          <div className="navbar-right">
            <div className="login">
              <button className="nav-link" onClick={() => setLoginIsOpen(true)}>
                Login
              </button>
              <button onClick={logout}>Logout</button>
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
            <button className="nav-link" onClick={() => setSignupIsOpen(true)}>
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
      <Footer />
    </React.Fragment>
  );
};

export default Home;
