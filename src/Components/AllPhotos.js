import React, { useEffect, useState } from "react";
import { auth } from "../db/signup";
import { deletePhoto } from "../db/pictures";
import "../Css/allphoto.css";
import { onAuthStateChanged } from "firebase/auth";
import { getLoggedUser } from "../db/users";

const AllPhotos = ({
  openAllPhotos,
  children,
  onAllPhotoClose,
  pictures,
  currUser,
  setPictures,
}) => {
  const [user, setUser] = useState(currUser);
  const [currentImg, setCurrentImg] = useState(0);
  const [img, setImg] = useState(pictures);

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, async (user) => {
  //     const newUser = await getLoggedUser();
  //     setUser(newUser);
  //     setImg(newUser.pictureBucket);

  //     console.log(">>> Auth state changed", picture);
  //     console.log(">>> newUser is", img);
  //   });
  //   return unsub;
  // }, []);
  useEffect(() => {
    setUser(currUser);
    setImg(pictures);
    console.log("in new useEffect");
  }, [pictures.length]);

  console.log(">>picturebucket", pictures);
  console.log(img);
  console.log("images>>>>", currUser);
  console.log(user);

  const handleDelete = async (e) => {
    e.preventDefault();
    const imageName = img[currentImg].imageName;
    const userId = auth.currentUser.uid;
    const updatedBucket = await deletePhoto(userId, imageName, currentImg);
    const filteredImages = img.filter((image, idx) => {
      if (idx !== currentImg) return image;
    });
    setPictures(filteredImages);
    setCurrentImg(0);
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
