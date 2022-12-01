import React from "react";

const SingleMatchView = ({ profilePic }) => {
  console.log("singlematchview profilepic", profilePic);

  return <img src={profilePic} alt="profilepic" />;
};

export default SingleMatchView;
