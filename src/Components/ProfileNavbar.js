import React, { useState } from "react";
import "../Css/profile.css";
import AddPhoto from "./AddPhoto";
import { logout } from "../db/signup";
import { useNavigate } from "react-router-dom";

const ProfileNavbar = ({ setSingleViewClicked }) => {
  const [isAddPhotoOpen, setAddPhotoIsOpen] = useState(false);
  const navigate = useNavigate();

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
      <button className="btn profile-picture" onClick={handleSingleView}>
        <i class="fa-regular fa-user"></i>
      </button>
      <div className="upload-photo">
        <button
          className="btn add-photo"
          onClick={() => setAddPhotoIsOpen(true)}
        >
          <i class="fa-solid fa-camera-retro"></i>
        </button>
        <AddPhoto
          openAddPhoto={isAddPhotoOpen}
          onAddPhotoClose={() => setAddPhotoIsOpen(false)}
        ></AddPhoto>
        <button className="btn logout" onClick={handleLogout}>
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </div>
    </div>
  );
};

export default ProfileNavbar;
