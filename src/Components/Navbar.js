import React from "react";
import "../Css/navbar.css";

const Navbar = () => {
  return (
    <div>
      <div className="navbar-logo">
        <div className="navbar-container">
          <a href="/news">Foodie</a>
          <a href="/news">About</a>
          <a href="/news">Pop-Ups</a>
          <a href="/news">Safety</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
