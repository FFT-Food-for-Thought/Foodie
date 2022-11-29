import React, { useState, useEffect } from "react";
import "../Css/profile.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/signup";
import { getLoggedUser } from "../db/users";
import { unstable_batchedUpdates } from "react-dom";
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
  return (
    <>
      <div className="profile-picture-container">
        <div className="padding">{user.email}</div>
        <div className="padding">{user.firstName}</div>
      </div>
      <div className="testing"></div>
    </>
  );
};

export default ProfilePictureView;
