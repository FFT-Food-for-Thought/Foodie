import React, { useState } from "react";
import "../Css/addphoto.css";
import { storage } from "../db/firebase";
import { ref, uploadBytes } from "firebase/storage";
const AddPhoto = ({ openAddPhoto, children, onAddPhotoClose }) => {
  const [imageUpload, setImageUpload] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageUpload == null) return;
    const imageRef = ref(storage, `currentUserImages/${imageUpload.name}1`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("image uploaded");
    });
  };
  const handleImageChange = async (e) => {
    e.preventDefault();
    setImageUpload(e.target.files[0]);
  };

  if (!openAddPhoto) return null;

  return (
    <>
      <div className="popup-overlay">
        <div className="add-photo-popup">
          <div className="add-photo-close">
            <button onClick={onAddPhotoClose}>X</button>
            {children}
          </div>
          <div>
            <input
              type="file"
              onChange={handleImageChange}
              placeholder="Add Photo"
              id="userPhoto"
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPhoto;
