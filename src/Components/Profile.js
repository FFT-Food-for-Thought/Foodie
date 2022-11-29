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
        <div className="box">
          <ProfilePictureView />
        </div>
      </div>
    </>
  );
};

export default Profile;
