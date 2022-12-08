import React, { useState } from "react";
import "../Css/singleuser.css";
import AddProfilePic from "./AddProfilePic";
import EditProfile from "./EditProfile";

const SingleUserCard = ({ user }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [isAddProfilePicOpen, setAddProfilePicIsOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileIsOpen] = useState(false);
  if (user.pictureBucket) {
    if (user.pictureBucket.length) {
      return (
        <div>
          <img src={user.pictureBucket[currentImg].URL} alt="" />
          <button onClick={() => setAddProfilePicIsOpen(true)}>
            Add Profile Pic
          </button>
          <AddProfilePic
            openProfilePic={isAddProfilePicOpen}
            onProfilePicClose={() => setAddProfilePicIsOpen(false)}
          ></AddProfilePic>
          <button onClick={() => setEditProfileIsOpen(true)}>
            Edit Profile
          </button>
          <EditProfile
            openEditProfile={isEditProfileOpen}
            onEditProfileClose={() => setEditProfileIsOpen(false)}
          ></EditProfile>
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
      return (
        <div>
          <div className="single-user-firstName">{user.firstName}NO PIC</div>
          <button onClick={() => setEditProfileIsOpen(true)}>
            Edit Profile
          </button>
          <EditProfile
            openEditProfile={isEditProfileOpen}
            onEditProfileClose={() => setEditProfileIsOpen(false)}
          ></EditProfile>
        </div>
      );
    }
  }
  return <div>Loading...</div>;
};

export default SingleUserCard;
