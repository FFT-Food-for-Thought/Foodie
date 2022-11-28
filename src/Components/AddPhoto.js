import React from "react";
import "../Css/addphoto.css";
import { getStorage, ref } from "firebase/storage";
const AddPhoto = ({ openAddPhoto, children, onAddPhotoClose }) => {
  //   const file = document.getElementById("userPhoto").value;
  //   const description = document.getElementById("userDescription").value;

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Add Photo" id="userPhoto" />
            <input
              type="text"
              placeholder="Add Description"
              id="userDescription"
            />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPhoto;
