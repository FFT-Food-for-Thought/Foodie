import React, { useState } from "react";
import "../Css/profile.css";
import AddPhoto from "./AddPhoto";
import { logout } from "../db/signup";
import { useNavigate } from "react-router-dom";
import { addProfilePicture } from "../db/pictures";

const ProfileNavbar = ({ setSingleViewClicked }) => {
  const [isAddPhotoOpen, setAddPhotoIsOpen] = useState(false);

  const [imageUpload, setImageUpload] = useState(null);
  const navigate = useNavigate();

  const handleProfileUpload = () => {
    console.log("uploading");
    addProfilePicture(imageUpload);
  };

  const handleImageChange = async (e) => {
    e.preventDefault();
    setImageUpload(e.target.files[0]);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handleSingleView = (e) => {
    e.preventDefault();
    setSingleViewClicked(true);
  };

  return (
    <div className="profile-navbar-container">
      <button onClick={handleSingleView}>Profile Navbar</button>
      <div>
        <input
          type="file"
          onChange={handleImageChange}
          placeholder="Add Photo"
          id="profilePicChooser"
        />
        <button onClick={handleProfileUpload}>Profile Pic</button>
      </div>
      <div className="upload-photo">
        <button className="add-photo" onClick={() => setAddPhotoIsOpen(true)}>
          Add Photo
        </button>
        <button onClick={handleLogout}>Logout</button>

        <AddPhoto
          openAddPhoto={isAddPhotoOpen}
          onAddPhotoClose={() => setAddPhotoIsOpen(false)}
        ></AddPhoto>
      </div>
    </div>
  );
};

export default ProfileNavbar;
