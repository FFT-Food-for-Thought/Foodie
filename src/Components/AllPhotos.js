import React, { useEffect, useState } from "react";
import { auth } from "../db/signup";
import { deletePhoto } from "../db/pictures";
import "../Css/allphoto.css";

const AllPhotos = ({
  pictureBucket,
  openAllPhotos,
  children,
  onAllPhotoClose,
}) => {
  // const [bucket, setBucket] = useState(pictureBucket);
  const [currentImg, setCurrentImg] = useState(0);
  const [localImages, setImages] = useState(pictureBucket);
  console.log(">>picturebucket", pictureBucket);
  // useEffect(() => {
  //   const unsub = () => {
  //     setImages(pictureBucket);
  //   };
  //   return unsub();
  // }, []);
  console.log("images>>>>", localImages);

  const handleDelete = async (e) => {
    e.preventDefault();
    const imageName = pictureBucket[currentImg].imageName;
    const userId = auth.currentUser.uid;
    const updatedBucket = await deletePhoto(userId, imageName, currentImg);
    // const filteredImages = localImages.filter((image, idx) => {
    //   if (idx !== currentImg) return image;
    // });
    // setImages(filteredImages);
  };

  if (!openAllPhotos) {
    return null;
  } else if (pictureBucket.length === 0 || pictureBucket === undefined) {
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
            <img src={pictureBucket[currentImg].URL} alt="" />
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
                currentImg < pictureBucket.length - 1 &&
                setCurrentImg(currentImg + 1)
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
