import React, { useEffect, useState } from "react";
import { auth } from "../db/signup";
import { deletePhoto } from "../db/pictures";

const AllPhotos = ({ pictureBucket }) => {
  const bucket = pictureBucket;

  const handleDelete = (imageName, idx) => {
    const userId = auth.currentUser.uid;
    deletePhoto(userId, imageName, idx);
    console.log("userId :>> ", userId);
  };

  if (bucket === null) {
    return (
      <>
        {bucket.map((pic, idx) => (
          <div key={idx}>
            <img src={pic.URL} />
            <button
              onClick={() => {
                handleDelete(pic.imageName, idx);
              }}
            >
              Delete Photo
            </button>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <>
        <div>No Pictures to load</div>
      </>
    );
  }
};

export default AllPhotos;
