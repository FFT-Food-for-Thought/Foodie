import React, { useState, useEffect } from "react";
import ProfileSideBar from "./ProfileSideBar";
import SingleProfileCard from "./SingleProfileCard";
import "../Css/profile.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/signup";
import { getLoggedUser } from "../db/users";
import OtherUserCards from "./OtherUserCards";
import AllPhotos from "./AllPhotos";

const Profile = () => {
  const [user, setUser] = useState({});

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

  return (
    <>
      <div className="sidebar">
        <ProfileSideBar likedUsers={user.likedUsers} />
      </div>
      <div className="picture-view">
        <div className="box">
          {/* <SingleProfileCard user={user} /> */}
          {/* <OtherUserCards /> */}
          <AllPhotos pictureBucket={user.pictureBucket} />
        </div>
      </div>
    </>
  );
};

export default Profile;
