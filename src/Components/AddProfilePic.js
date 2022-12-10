import React, { useState } from "react";
import "../Css/editprofilepicture.css";
import { addProfilePicture, deleteProfilePicture } from "../db/pictures";

const AddProfilePic = ({
  openProfilePic,
  children,
  onProfilePicClose,
  setUserPfp,
}) => {
  const [imageUpload, setImageUpload] = useState(null);

  const handleProfileUpload = async () => {
    console.log("uploading");
    await deleteProfilePicture();
    const newPfp = await addProfilePicture(imageUpload);
    setUserPfp(newPfp);
  };

  const handleImageChange = async (e) => {
    e.preventDefault();

    setImageUpload(e.target.files[0]);
  };
  if (!openProfilePic) return null;

  return (
    <>
      <div className="popup-overlay">
        <div className="edit-profile-photos-popup">
          <div className="edit-add-photo-close">
            <button
              onClick={onProfilePicClose}
              className="edit-user-profile-pic-close"
            >
              X
            </button>
            {children}
          </div>
          <div className="edit-pic-text">
            Would you like to change your profile picture?
          </div>
          <div className="edit-choose-file">
            <input
              type="file"
              onChange={handleImageChange}
              placeholder="Add Photo"
              id="profilePicChooser"
              className="edit-choose-file-box"
            />
          </div>
          <div className="edit-submit-profile-pic">
            <button
              onClick={handleProfileUpload}
              className="edit-profile-pic-button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProfilePic;
