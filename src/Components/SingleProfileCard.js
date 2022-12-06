import React, { useState } from "react";
import "../Css/otheruser.css";

const SingleProfileCard = ({ user }) => {
  const [currentImg, setCurrentImg] = useState(0);

  if (user.pictureBucket) {
    if (user.pictureBucket.length) {
      return (
        <div>
          <img
            src={user.pictureBucket[currentImg].URL}
            alt=""
            className="other-user-img"
          />
          <h1>{user.firstName}</h1>
          <button
            onClick={() => {
              let div = document.getElementById("infoDiv");
              if (div.style.display === "block") {
                div.style.display = "none";
              } else {
                div.style.display = "block";
              }
            }}
          >
            {"info"}
          </button>
          <br></br>
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
    } else {
      return <div>{user.firstName}NO PIC</div>;
    }
  }
  return <div>Loading...</div>;
};

export default SingleProfileCard;
