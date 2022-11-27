import React from "react";
import "../Css/home.css";
import Footer from "./Footer";

const Home = () => {
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
        <span className="cycling">
          <h1 className="cycle"></h1>
        </span>

        <div className="create-account">
          <a href="/create">Create Account</a>
        </div>

        <div className="slogan">
          <h2>Connect with the perfect chef</h2>
          <h2>To eat the perfect meal!</h2>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Home;
