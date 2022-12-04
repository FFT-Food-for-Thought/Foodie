import React from "react";

const SingleMatchView = ({ likedObj }) => {
  console.log("singlematchview profilepic", likedObj);

  return (
    <>
      <img src={likedObj.URL} alt="profilepic" />
      <p>{likedObj.name}</p>
    </>
  );
};

export default SingleMatchView;
