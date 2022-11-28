import React from "react";
import ProfileMatchMessage from "./ProfileMatchMessage";
import ProfileNavbar from "./ProfileNavbar";
import "../Css/profile.css";
const ProfileSideBar = () => {
  return (
    <>
      <ProfileNavbar />
      <ProfileMatchMessage />
    </>
  );
};

export default ProfileSideBar;
