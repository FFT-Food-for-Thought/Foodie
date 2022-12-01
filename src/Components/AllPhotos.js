import React, { useEffect, useState } from "react";
import { auth } from "../db/signup";
import { deletePhoto } from "../db/pictures";

const AllPhotos = ({ pictureBucket }) => {
  const bucket = pictureBucket || [];

  const handleDelete = (imageName) => {
    const userId = auth.currentUser.uid;
    deletePhoto(userId, imageName);
  };

  return (
    <>
      {bucket.map((pic, idx) => (
        <div key={idx}>
          <img src={pic.URL} />
          <button
            onClick={() => {
              handleDelete(pic.imageName);
            }}
          >
            Delete Photo
          </button>
        </div>
      ))}
    </>
  );
};

export default AllPhotos;
