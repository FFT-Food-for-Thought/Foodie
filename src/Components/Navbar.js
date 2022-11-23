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

      <div></div>
    </React.Fragment>
  );
};

export default Navbar;
