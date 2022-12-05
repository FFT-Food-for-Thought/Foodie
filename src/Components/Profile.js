import React, { useState, useEffect } from "react";
import ProfileSideBar from "./ProfileSideBar";
import SingleProfileCard from "./SingleProfileCard";
import SingleUserCard from "./SingleUserCard";
import "../Css/profile.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/signup";
import { getLoggedUser } from "../db/users";
import OtherUserCards from "./OtherUserCards";
import AllPhotos from "./AllPhotos";
import { distance } from "../db/users";
const Profile = () => {
  const [user, setUser] = useState({});
  const [isSingleView, setSingleViewClicked] = useState(false);
  const handleView = (e) => {
    e.preventDefault();
    setSingleViewClicked(false);
  };
  if ("geolocation" in navigator) {
    /* geolocation is available */
    console.log("gelocation is useable");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude, position.coords.longitude);

        console.log(
          "distance formulat being used, you are this many miles from disneyland in a straight line",
          distance(
            position.coords.latitude,
            position.coords.longitude,
            28.377242637128813,
            -81.57071111805162
          )
        );
      },
      () => {
        console.log(
          "I can't calculate your distance from disney land if you don't share your location :("
        );
      }
    );
  } else {
    /* geolocation IS NOT available */
    //28.377242637128813, -81.57071111805162
  }

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
              loggedInUser={user}
              setSingleViewClicked={setSingleViewClicked}
            />
          </div>
          <div className="picture-view">
            <div className="box">
              <SingleUserCard user={user} />
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
              <OtherUserCards loggedInUser={user} />
              {/* <AllPhotos pictureBucket={user.pictureBucket} /> */}
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
