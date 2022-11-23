import React from "react";
import Navbar from "../Components/Navbar";
import "../Css/home.css";

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-page-container">
        {" "}
        <Navbar />
        <div>{/* <img src=""></img> */}</div>
      </div>
    </div>
  );
};

export default Home;
