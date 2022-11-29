import React, { useState } from "react";
import "../Css/addphoto.css";
import { storage } from "../db/firebase";
import { auth } from "../db/signup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addPicture } from "../db/pictures";
const AddPhoto = ({ openAddPhoto, children, onAddPhotoClose }) => {
  const [imageUpload, setImageUpload] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${uid}/${imageUpload.name}5`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("image uploaded");
    });
    console.log("right befoew get URL");
    const URL = await getDownloadURL(imageRef);
    console.log(URL);
    await addPicture(URL);
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
