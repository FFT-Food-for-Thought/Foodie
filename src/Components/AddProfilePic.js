import React, { useState } from "react";
import "../Css/editprofilepicture.css";
import { addProfilePicture } from "../db/pictures";

const AddProfilePic = ({ openProfilePic, children, onProfilePicClose }) => {
  const [imageUpload, setImageUpload] = useState(null);

  const handleProfileUpload = () => {
    console.log("uploading");
    addProfilePicture(imageUpload);
  };

  const handleImageChange = async (e) => {
    e.preventDefault();
    setImageUpload(e.target.files[0]);
  };
  if (!openProfilePic) return null;

  return (
    <>
      <div className="popup-overlay">
        <div className="add-photo-popup">
          <div className="add-photo-close">
            <button onClick={onProfilePicClose}>X</button>
            {children}
          </div>
          <div>
            <input
              type="file"
              onChange={handleImageChange}
              placeholder="Add Photo"
              id="profilePicChooser"
            />
            <button onClick={handleProfileUpload}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProfilePic;
