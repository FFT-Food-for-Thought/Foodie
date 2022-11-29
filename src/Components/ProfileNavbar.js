import React, { useState } from "react";
import "../Css/profile.css";
import AddPhoto from "./AddPhoto";
const ProfileNavbar = () => {
  const [isAddPhotoOpen, setAddPhotoIsOpen] = useState(false);
  return (
    <div className="profile-navbar-container">
      <div>Profile Navbar</div>
      <div className="upload-photo">
        <button className="add-photo" onClick={() => setAddPhotoIsOpen(true)}>
          Add Photo
        </button>

        <AddPhoto
          openAddPhoto={isAddPhotoOpen}
          onAddPhotoClose={() => setAddPhotoIsOpen(false)}
        ></AddPhoto>
      </div>
    </div>
  );
};

export default ProfileNavbar;
