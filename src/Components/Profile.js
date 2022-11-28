import React from "react";
import ProfileSideBar from "./ProfileSideBar";
import ProfilePictureView from "./ProfilePictureView";
import "../Css/profile.css";

const Profile = () => {
  return (
    <>
      <div className="sidebar">
        <ProfileSideBar />
      </div>
      <div className="picture-view">
        <ProfilePictureView />
      </div>
    </>
  );
};

export default Profile;
