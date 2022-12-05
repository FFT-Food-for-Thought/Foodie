import React from "react";
import Chat from "./Chat";
import { auth } from "../db/signup";
const SingleMatchView = ({ likedObj, loggedinUser }) => {
  console.log("singlematchview profilepic", likedObj);

  return (
    <>
      <img src={likedObj.URL} alt="profilepic" />
      <p>{likedObj.name}</p>
      <Chat target={likedObj} loggedinUser={loggedinUser} />
    </>
  );
};

export default SingleMatchView;
