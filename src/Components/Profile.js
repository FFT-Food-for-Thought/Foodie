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
          </div>
        </div>
      </>
    );
  }
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
};

export default Profile;
