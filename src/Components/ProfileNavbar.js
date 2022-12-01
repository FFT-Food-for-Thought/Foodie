import React, { useState } from "react";
import "../Css/profile.css";
import AddPhoto from "./AddPhoto";
import { logout } from "../db/signup";
import { addProfilePicture } from "../db/pictures";
import { useNavigate, Link } from "react-router-dom";

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
      <button onClick={handleSingleView}>Profile Picture</button>
      <div className="upload-photo">
        <button className="add-photo" onClick={() => setAddPhotoIsOpen(true)}>
          Add Photo
        </button>
        <AddPhoto
          openAddPhoto={isAddPhotoOpen}
          onAddPhotoClose={() => setAddPhotoIsOpen(false)}
        ></AddPhoto>
        <button onClick={handleLogout}>Logout</button>
        <Link to="/profile/allphotos">View All Photos</Link>
      </div>
    </div>
  );
};

export default ProfileNavbar;
