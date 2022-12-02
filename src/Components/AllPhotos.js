import React, { useEffect, useState } from "react";
import { auth } from "../db/signup";
import { deletePhoto } from "../db/pictures";

const AllPhotos = ({ pictureBucket }) => {
  const [bucket, setBucket] = useState(pictureBucket);
  console.log("bucket :>> ", bucket);

  const handleDelete = async (imageName, idx) => {
    const userId = auth.currentUser.uid;
    const updatedBucket = await deletePhoto(userId, imageName, idx);
    setBucket(updatedBucket);
  };

  if (bucket === undefined || bucket.length === 0) {
    return (
      <>
        <div>No Pictures to load</div>
      </>
    );
  } else {
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
  }
};

export default AllPhotos;
