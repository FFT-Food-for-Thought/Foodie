import React, { useState, useEffect } from "react";
import ProfileSideBar from "./ProfileSideBar";
import SingleProfileCard from "./SingleProfileCard";
import SingleUserCard from "./SingleUserCard";
import "../Css/profile.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/signup";
import { getLoggedUser, getAllUsers, removeLike } from "../db/users";
import OtherUserCards from "./OtherUserCards";
import { distance } from "../db/users";
import { addGeo } from "../db/users";

const Profile = () => {
  const [user, setUser] = useState({});
  const [allUsers, setUsers] = useState([]);
  const [isSingleView, setSingleViewClicked] = useState(false);
  const [likedUsers, setLikedList] = useState([]);
  const handleView = (e) => {
    e.preventDefault();
    setSingleViewClicked(false);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      const newUser = await getLoggedUser();
      setUser(newUser);
      setLikedList(newUser.likedUsers);
      console.log("Auth state changed", user);
      console.log("newuser", newUser);
    });
    if ("geolocation" in navigator) {
      /* geolocation is available */
      console.log("geolocation is useable");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          addGeo(user.id, position.coords.latitude, position.coords.longitude);

          // console.log(
          //   "distance formulat being used, you are this many miles from disneyland in a straight line",
          //   distance(
          //     position.coords.latitude,
          //     position.coords.longitude,
          //     28.377242637128813,
          //     -81.57071111805162
          //   )
          // );
        },
        () => {
          // console.log(
          //   "I can't calculate your distance from disney land if you don't share your location :("
          // );
        }
      );
    }
    return unsub;
  }, []);

  useEffect(() => {
    const _getUsers = async (users) => {
      //returns array of all users in Users
      const allUsersLocal = await getAllUsers();
      console.log("in useEffect", allUsersLocal);
      //filter self out of potential others

      setUsers(allUsersLocal);
    };
    _getUsers();
  }, []);
  console.log(user);

  console.log(user.pictureBucket);
  console.log("profile component rendered");
  const handleLike = (userObj) => {
    console.log("likedusers", likedUsers);
    console.log(user);
    const updatedLiked = [...likedUsers];
    console.log("updatedLiked", updatedLiked);
    updatedLiked.push(userObj);
    setLikedList(updatedLiked);
    console.log("updatedlikedusers State", likedUsers);
  };

  const removeLikedHandler = (userObj) => {
    const objectToRemove = {
      name: userObj.name,
      userId: userObj.userId,
    };
    console.log(objectToRemove);

    removeLike(user.id, objectToRemove);

    const filtered = likedUsers.filter((userObj) => {
      if (userObj.userId != objectToRemove.userId) {
        return userObj;
      }
    });
    console.log(filtered);
    setLikedList(filtered);

    //updateLikedList to remove the removed person
  };

  if (user.userId) {
    if (isSingleView) {
      return (
        <>
          <div className="sidebar">
            <ProfileSideBar
              likedUsers={likedUsers}
              loggedInUser={user}
              setSingleViewClicked={setSingleViewClicked}
              removeLikedHandler={removeLikedHandler}
              user={user}
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
              likedUsers={likedUsers}
              setSingleViewClicked={setSingleViewClicked}
              user={user}
              allUsers={allUsers}
              removeLikedHandler={removeLikedHandler}
            />
          </div>
          <div className="picture-view">
            <div className="box">
              <OtherUserCards
                loggedInUser={user}
                allUsers={allUsers}
                handleLike={handleLike}
              />
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
