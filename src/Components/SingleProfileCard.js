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
          <div className="left-right">
            <button
              onClick={() => {
                currentImg > 0 && setCurrentImg(currentImg - 1);
              }}
              className="left-right-button"
            >
              <i class="fa-solid fa-angles-left"></i>
            </button>
            <button
              onClick={() =>
                currentImg < user.pictureBucket.length - 1 &&
                setCurrentImg(currentImg + 1)
              }
              className="left-right-button"
            >
              <i class="fa-solid fa-angles-right"></i>
            </button>
          </div>
          <div className="name-and-location">
            <div className="basic-info">
              <h1 className="other-user-firstName">{user.firstName}</h1>
              <button
                onClick={() => {
                  let div = document.getElementById("infoDiv");
                  if (div.style.display === "block") {
                    div.style.display = "none";
                  } else {
                    div.style.display = "block";
                  }
                }}
                className="info-button"
              >
                <i class="fa-solid fa-circle-info"></i>
              </button>
            </div>
            <div className="basic-info">
              <i class="fa-solid fa-house"></i>
              <p className="other-user-location">Lives in {user.location}</p>
            </div>
            <div className="basic-info">
              <i class="fa-solid fa-location-dot"></i>
              <p className="other-user-location">miles away</p>
            </div>
          </div>
          <br></br>
        </div>
      );
    } else {
      return <div>{user.firstName}NO PIC</div>;
    }
  }
  return <div>Loading...</div>;
};

export default SingleProfileCard;
