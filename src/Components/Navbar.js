import React from "react";
import "../Css/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <React.Fragment>
      <div className="navbar-container">
        <div className="navbar">
          <div className="navbar-left">
            <a href="/home">Foodie</a>
          </div>

          <div className="navbar-left">
            <a href="/about">About</a>
          </div>

          <div className="navbar-left">
            <a href="/popup">Pop-Ups</a>
          </div>

          <div className="navbar-left">
            <a href="/safety">Safety</a>
          </div>
        </div>
        <div className="navbar-right">
          <div className="login">
            <a href="/login">Login</a>
          </div>
        </div>
      </div>

      <div className="center-container">
        {/* <div className="center"> */}
        <div>
          <h1>Swipe Right</h1>
        </div>

        <div className="create-account">
          <a href="/create">Create Account</a>
        </div>

        <div className="slogan">
          <h2>Connect with your perfect dinner</h2>
          <h2>Made by the perfect chef!</h2>
        </div>
      </div>
      {/* </div> */}
    </React.Fragment>
  );
};

export default Navbar;
