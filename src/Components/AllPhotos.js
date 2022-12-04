import React, { useEffect, useState } from "react";
import { auth } from "../db/signup";
import { deletePhoto } from "../db/pictures";
import "../Css/allphoto.css";
import { onAuthStateChanged } from "firebase/auth";
import { getLoggedUser } from "../db/users";

const AllPhotos = ({ openAllPhotos, children, onAllPhotoClose }) => {
  const [user, setUser] = useState({});
  const [currentImg, setCurrentImg] = useState(0);
  const [img, setImg] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      const newUser = await getLoggedUser();
      setUser(newUser);
      setImg(newUser.pictureBucket);

      console.log(">>> Auth state changed", user);
      console.log(">>> newUser is", newUser);
    });
    return unsub;
  }, []);
  console.log(">>picturebucket", img);

  console.log("images>>>>", img);

  const handleDelete = async (e) => {
    e.preventDefault();
    const imageName = img[currentImg].imageName;
    const userId = auth.currentUser.uid;
    const updatedBucket = await deletePhoto(userId, imageName, currentImg);
    const filteredImages = img.filter((image, idx) => {
      if (idx !== currentImg) return image;
    });
    setImg(filteredImages);
  };

  if (!openAllPhotos) {
    return null;
  } else if (img.length === 0 || img === undefined) {
    return (
      <>
        <div className="popup-overlay">
          <div className="add-photo-popup">
            <div className="all-photo-close">
              <button onClick={onAllPhotoClose}>X</button>
              {children}
            </div>
            <div>No Pictures to load</div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="popup-overlay">
          <div className="add-photo-popup">
            <div className="all-photo-close">
              <button onClick={onAllPhotoClose}>X</button>
              {children}
            </div>
            <img src={img[currentImg].URL} alt="" />
            <button
              onClick={(e) => {
                handleDelete(e);
              }}
            >
              Delete Photo
            </button>
            <button
              onClick={() => {
                currentImg > 0 && setCurrentImg(currentImg - 1);
              }}
            >
              {"<<"}
            </button>
            <button
              onClick={() =>
                currentImg < img.length - 1 && setCurrentImg(currentImg + 1)
              }
            >
              {">>"}
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default AllPhotos;
