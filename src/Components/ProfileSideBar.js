import React from "react";
import ProfileMatchMessage from "./ProfileMatchMessage";
import ProfileNavbar from "./ProfileNavbar";
import "../Css/profile.css";
const ProfileSideBar = ({ likedUsers }) => {
  return (
    <>
      <ProfileNavbar />
      <ProfileMatchMessage likedUsers={likedUsers} />
    </>
  );
};

export default ProfileSideBar;
