import React, { useState } from "react";
import "../Css/addphoto.css";
import { storage } from "../db/firebase";
import { auth } from "../db/signup";
import { uuidv4 as v4 } from "@firebase/util";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addPicture } from "../db/pictures";

const AddPhoto = ({ openAddPhoto, children, onAddPhotoClose }) => {
  const [imageUpload, setImageUpload] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    if (imageUpload == null) return;

    const imageName = `${imageUpload.name}` + v4();
    const imageRef = ref(storage, `${uid}/${imageName}`);

    // uploadBytes(imageRef, imageUpload).then(() => {
    //   alert("image uploaded");
    // });
    await uploadBytes(imageRef, imageUpload);
    alert("image uploaded");
    console.log("right before get URL");
    const URL = await getDownloadURL(imageRef);
    console.log(URL);
    await addPicture(URL, imageName, uid);
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
