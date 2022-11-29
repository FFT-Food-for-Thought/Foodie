import React, { useState } from "react";
import "../Css/profile.css";
import AddPhoto from "./AddPhoto";
import { logout } from "../db/signup";
import { useNavigate } from "react-router-dom";

const ProfileNavbar = () => {
  const [isAddPhotoOpen, setAddPhotoIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="profile-navbar-container">
      <div>Profile Navbar</div>
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
