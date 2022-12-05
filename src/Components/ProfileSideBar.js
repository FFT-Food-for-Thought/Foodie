import React from "react";
import ProfileMatchMessage from "./ProfileMatchMessage";
import ProfileNavbar from "./ProfileNavbar";
import "../Css/profile.css";
const ProfileSideBar = ({ likedUsers, setSingleViewClicked, loggedInUser }) => {
  return (
    <>
      <ProfileNavbar setSingleViewClicked={setSingleViewClicked} />
      <ProfileMatchMessage
        likedUsers={likedUsers}
        loggedInUser={loggedInUser}
      />
    </>
  );
};

export default ProfileSideBar;
