import React, { useState, useEffect } from "react";
import ProfileSideBar from "./ProfileSideBar";
import SingleProfileCard from "./SingleProfileCard";

import "../Css/profile.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/signup";
import { getLoggedUser } from "../db/users";
import OtherUserCards from "./OtherUserCards";

const Profile = () => {
  const [user, setUser] = useState({});
  const [isSingleView, setSingleViewClicked] = useState(false);
  const handleView = (e) => {
    e.preventDefault();
    setSingleViewClicked(false);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      const newUser = await getLoggedUser();
      setUser(newUser);

      console.log("Auth state changed", user);
      console.log("newuser", newUser);
    });
    return unsub;
  }, []);
  console.log(user);

  console.log(user.pictureBucket);

  if (user.userId) {
    if (isSingleView) {
      return (
        <>
          <div className="sidebar">
            <ProfileSideBar
              likedUsers={user.likedUsers}
              setSingleViewClicked={setSingleViewClicked}
            />
          </div>
          <div className="picture-view">
            <div className="box">
              <SingleProfileCard user={user} />
              <button onClick={handleView}>Continue Browsing</button>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="sidebar">
            <ProfileSideBar
              likedUsers={user.likedUsers}
              setSingleViewClicked={setSingleViewClicked}
            />
          </div>
          <div className="picture-view">
            <div className="box">
              <OtherUserCards />
            </div>
          </div>
        </>
      );
    }
  } else {
    return <div>Loading...</div>;
  }
};

export default Profile;
