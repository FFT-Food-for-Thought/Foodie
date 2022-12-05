import React from "react";
import { removeLike } from "../db/users";
const SingleMatchView = ({ likedObj }) => {
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
