import React from "react";
import ProfileMatchMessage from "./ProfileMatchMessage";
import ProfileNavbar from "./ProfileNavbar";
import "../Css/profile.css";

const ProfileSideBar = ({ likedUsers, setSingleViewClicked, user }) => {
  console.log("profileSideBar", user);

  return (
    <>
      <ProfileNavbar setSingleViewClicked={setSingleViewClicked} />
      <ProfileMatchMessage likedUsers={likedUsers} user={user} />
    </>
  );
};

export default ProfileSideBar;
