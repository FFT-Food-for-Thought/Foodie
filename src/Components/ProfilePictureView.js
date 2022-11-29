import React, { useState, useEffect } from "react";
import "../Css/profile.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/signup";
import { getLoggedUser } from "../db/users";

const ProfilePictureView = () => {
  const [user, setUser] = useState({});
  const [currentImg, setCurrentImg] = useState(0);
  // let loggedIn = false;
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      const newUser = await getLoggedUser();
      setUser(newUser);

      console.log("Auth state changed", user);
    });
    return unsub;
  }, []);
  console.log(user);
  console.log(user.pictureBucket);

  if (user.pictureBucket) {
    return (
      <div>
        {/* {user.pictureBucket.map((image) => (
          <div>
            <img src={image.URL} />
          </div>
        ))} */}
        {/* </div> */}
        <div>
          <img src={user.pictureBucket[currentImg].URL} />
          <h1>{user.firstName}</h1>
          <button
            onClick={() => {
              currentImg > 0 && setCurrentImg(currentImg - 1);
            }}
          >
            {"<<"}
          </button>
          <button
            onClick={() =>
              currentImg < user.pictureBucket.length - 1 &&
              setCurrentImg(currentImg + 1)
            }
          >
            {">>"}
          </button>
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default ProfilePictureView;
