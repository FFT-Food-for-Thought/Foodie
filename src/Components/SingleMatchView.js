import React from "react";

const SingleMatchView = ({ likedObj }) => {
  console.log("singlematchview profilepic", likedObj);

  if (likedObj.URL) {
    return (
      <>
        <img src={likedObj.URL} alt="profilepic" className="match-img" />
        {/* <p>{likedObj.name}</p> */}
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
        {/* <p>{likedObj.name}</p> */}
      </>
    );
  }
};

export default SingleMatchView;
