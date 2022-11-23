import React from "react";
import "../Css/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-left">
          <a href="/home">Foodie</a>

          <a href="/about">About</a>

          <a href="/popup">Pop-Ups</a>

          <a href="/safety">Safety</a>
        </div>
      </div>
      <div class="navbar-right">
        <div>Login</div>
      </div>
    </div>
  );
};

export default Navbar;
