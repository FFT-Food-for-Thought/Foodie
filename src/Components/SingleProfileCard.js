import React, { useState } from "react";
import "../Css/profile.css";

const SingleProfileCard = ({ user }) => {
  const [currentImg, setCurrentImg] = useState(0);

  if (user.pictureBucket) {
    return (
      <div>
        <img src={user.pictureBucket[currentImg].URL} alt="" />
        <h1>{user.firstName}</h1>
        <button
          onClick={() => {
            currentImg > 0 && setCurrentImg(currentImg - 1);
          }}
        >
          {"<<"}
        </button>
        <button
          onClick={() =>
            currentImg < user.pictureBucket.length - 1 &&
            setCurrentImg(currentImg + 1)
          }
        >
          {">>"}
        </button>
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default SingleProfileCard;
