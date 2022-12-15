import React, { useState, useEffect } from "react";
import ProfileSideBar from "./ProfileSideBar";
import SingleUserCard from "./SingleUserCard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/signup";
import { getLoggedUser, getAllUsers, removeLike } from "../db/users";
import OtherUserCards from "./OtherUserCards";
import { addGeo } from "../db/users";
import MatchedProfile from "./MatchedProfile";
import { useNavigate } from "react-router-dom";
import "../Css/profile.css";
import "../Css/otheruser.css";

const Profile = () => {
  const [user, setUser] = useState({});
  const [allUsers, setUsers] = useState([]);
  const [isSingleView, setSingleViewClicked] = useState(false);
  const [isMatchedView, setMatchedViewClicked] = useState(false);
  const [likedUsers, setLikedList] = useState([]);
  const [currentMatch, setCurrentMatch] = useState({});
  const navigate = useNavigate();
  const handleView = (e) => {
    e.preventDefault();
    setSingleViewClicked(false);
  };
  const handleMatchedView = (e) => {
    e.preventDefault();
    setMatchedViewClicked(false);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      const newUser = await getLoggedUser();
      setUser(newUser);
      setLikedList(newUser.likedUsers);
      if (user) {
        navigate("/profile");
      }
      if ("geolocation" in navigator) {
        /* geolocation is available */
        console.log("geolocation is useable");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            addGeo(
              newUser.id,
              position.coords.latitude,
              position.coords.longitude
            );
          },
          () => {
            // console.log(
            //   "I can't calculate your distance from disney land if you don't share your location :("
            // );
          }
        );
      }
      return unsub;
    });
  }, []);

  useEffect(() => {
    const _getUsers = async (users) => {
      //returns array of all users in Users
      const allUsersLocal = await getAllUsers();
      //filter self out of potential others

      setUsers(allUsersLocal);
    };
    _getUsers();
  }, [likedUsers.length]);

  const handleLike = (userObj) => {
    const updatedLiked = [...likedUsers];
    updatedLiked.push(userObj);
    setLikedList(updatedLiked);
  };

  const removeLikedHandler = (userObj) => {
    const objectToRemove = {
      name: userObj.name,
      userId: userObj.userId,
    };

    removeLike(user.id, objectToRemove);

    const filtered = likedUsers.filter((userObj) => {
      if (userObj.userId != objectToRemove.userId) {
        return userObj;
      }
    });
    console.log("remove like", likedUsers);
    console.log("remove like", filtered);
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
              setMatchedViewClicked={setMatchedViewClicked}
              removeLikedHandler={removeLikedHandler}
              setCurrentMatch={setCurrentMatch}
              currentMatch={currentMatch}
              user={user}
            />
          </div>
          <div className="picture-view">
            <div className="single-user-box">
              <SingleUserCard user={user} />
              <button onClick={handleView} className="single-user-browsing">
                Continue Browsing
              </button>
            </div>
          </div>
        </>
      );
    } else if (isMatchedView) {
      return (
        <>
          <div className="sidebar">
            <ProfileSideBar
              likedUsers={likedUsers}
              loggedInUser={user}
              setSingleViewClicked={setSingleViewClicked}
              setMatchedViewClicked={setMatchedViewClicked}
              removeLikedHandler={removeLikedHandler}
              setCurrentMatch={setCurrentMatch}
              currentMatch={currentMatch}
              user={user}
            />
          </div>
          <div className="picture-view">
            <div className="box">
              <MatchedProfile user={currentMatch} loggedInUser={user} />
              <button
                onClick={handleMatchedView}
                className="continue-browsing-button"
              >
                Continue Browsing
              </button>
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
              setMatchedViewClicked={setMatchedViewClicked}
              user={user}
              allUsers={allUsers}
              removeLikedHandler={removeLikedHandler}
              setCurrentMatch={setCurrentMatch}
              currentMatch={currentMatch}
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
