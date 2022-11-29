import React, { useState, useEffect } from "react";
import "../Css/profile.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/signup";
import { getLoggedUser } from "../db/users";
const ProfilePictureView = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      const newUser = await getLoggedUser();
      setUser(newUser);

      console.log("Auth state changed", user);
      console.log();
    });
    return unsub;
  }, []);
  console.log(user);
  if (user.pictureBucket) {
    return (
      <>
        <div className="profile-picture-container">
          <div className="padding">{user.email}</div>
          <div className="padding">{user.firstName}</div>
          {user.pictureBucket.map((img) => {
            return img.URL;
          })}
        </div>
        <div className="testing"></div>
      </>
    );
  } else {
    return <div>loading</div>;
  }
};

export default ProfilePictureView;
