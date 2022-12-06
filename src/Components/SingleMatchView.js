import React from "react";
import { removeLike } from "../db/users";
const SingleMatchView = ({ likedObj }) => {
  console.log("singlematchview profilepic", likedObj);

  if (likedObj.URL) {
    return (
      <>
        <img src={likedObj.URL} alt="profilepic" className="match-img" />
        <p
          onClick={() => {
            console.log("clicked", likedObj);
          }}
        >
          {likedObj.name}
        </p>
      </>
    );
  } else {
    return (
      <>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt="profilepic"
          className="match-img"
        />
        <p
          onClick={() => {
            console.log("clicked", likedObj);
          }}
        >
          {likedObj.name}
        </p>
      </>
    );
  }
};

export default SingleMatchView;
