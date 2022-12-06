import React from "react";
import { removeLike } from "../db/users";
const SingleMatchView = ({ likedObj }) => {
  console.log("singlematchview profilepic", likedObj);

  return (
    <>
      <img src={likedObj.URL} alt="profilepic" className="match-img" />
      <p>{likedObj.name}</p>
    </>
  );
};

export default SingleMatchView;
