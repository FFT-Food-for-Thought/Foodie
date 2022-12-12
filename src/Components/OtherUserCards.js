import React, { useState, useEffect } from "react";
import { filterByPhotoTags } from "../db/users";
import {
  getAllUsers,
  addReviewToReviewee,
  addReviewToReviewer,
  addLikedUser,
  getAllChefs,
} from "../db/users";
import SingleProfileCard from "./SingleProfileCard";
import "../Css/otheruser.css";
import userEvent from "@testing-library/user-event";

const OtherUserCards = ({ loggedInUser, allUsers, handleLike }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [currentUser, setCurrentUser] = useState(0);
  const [users, setUsers] = useState(allUsers);
  console.log("new all users check", allUsers, users);
  const dummyReviewId = "reviewIdgibberish";
  const onAddReviewHandler = (revieweeId) => {
    console.log("revieweeid", revieweeId);
    console.log("logged id", loggedInUser);
    addReviewToReviewee(revieweeId, dummyReviewId);
    addReviewToReviewer(loggedInUser.id, dummyReviewId);
    console.log("clicked");
  };
  console.log("nousersagai", allUsers);
  useEffect(() => {
    const set = () => {
      console.log("loggedAgain", loggedInUser);

      const noMe = allUsers.filter((otherUserObj) => {
        if (otherUserObj.userId != loggedInUser.userId) {
          console.log("checking id", otherUserObj.userId, loggedInUser.userId);
          return otherUserObj;
        }
      });

      if (loggedInUser.likedUsers.length) {
        const checked = {};
        loggedInUser.likedUsers.forEach((likedObj) => {
          console.log("map", likedObj);
          checked[likedObj.userId] = true;
        });
        console.log("map", checked);
        const removedMatched = noMe.filter((userObj) => {
          console.log("map", userObj.userId);
          if (!checked[userObj.userId]) {
            return userObj;
          }
        });
        console.log("nousersagaiR", removedMatched);
        setUsers(removedMatched);
      } else {
        setUsers(noMe);
      }
    };
    set();
  }, [allUsers.length]);
  // useEffect(() => {
  //   const _getUsers = async (users) => {
  //     //returns array of all users in Users
  //     const newUser = await getAllChefs();
  //     console.log("in useEffect", newUser);
  //     //filter self out of potential others
  //     const onlyOthers = newUser.filter((userObj) => {
  //       if (userObj.userId !== loggedInUser.userId) {
  //         return userObj;
  //       }
  //     });
  //     if (loggedInUser.preference) {
  //       const onlyPreference = filterByPhotoTags(
  //         onlyOthers,
  //         loggedInUser.preference
  //       );
  //       setUsers(onlyPreference);
  //     } else {
  //       setUsers(onlyOthers);
  //     }
  //   };
  //   _getUsers();
  // }, []);
  console.log("more fetches", users);

  // const handleLike = (otherUserObj) => {
  //   console.log("in handle like", otherUserObj);
  //   const likedId = otherUserObj.userId;
  //   console.log("likedId", likedId);
  //   const likedName = otherUserObj.firstName;
  //   console.log("likedName", likedName);
  //   addLikedUser(loggedInUser.id, likedId, likedName);
  // };
  if (users.length) {
    return (
      <div className="other-user">
        <SingleProfileCard
          user={users[currentUser]}
          currentImg={currentImg}
          setCurrentImg={setCurrentImg}
        />
        <div className="other-user-next">
          <button
            onClick={() => {
              currentUser < users.length - 1 && setCurrentUser(currentUser + 1);
              setCurrentImg(0);
            }}
            className="other-user-button next"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
          {/*
          <button
            onClick={() => {
              onAddReviewHandler(users[currentUser].id);
            }}
            className="other-user-button review"
          >
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          */}
          <button
            onClick={() => {
              const likedObj = {
                userId: users[currentUser].userId,
                name: users[currentUser].firstName,
              };
              console.log("in like click", likedObj);
              setCurrentImg(0);
              handleLike(likedObj);
              addLikedUser(
                loggedInUser.id,
                users[currentUser].userId,
                users[currentUser].firstName
              );
              currentUser < users.length - 1 && setCurrentUser(currentUser + 1);
            }}
            className="other-user-button like"
          >
            <i class="fa-regular fa-heart"></i>
          </button>
        </div>
        <div id="infoDiv">
          This is {users[currentUser].firstName}'s info. Taiyaki slow-carb
          flannel green juice vinyl cray. Polaroid ascot aesthetic wolf banjo
          skateboard. IPhone la croix snackwave leggings jean shorts tumblr,
          viral neutra. Brunch everyday carry vexillologist yuccie selfies.
          Actually flexitarian chia knausgaard normcore Brooklyn. Etsy actually
          vexillologist 8-bit, vice snackwave scenester tilde locavore taiyaki.
          Pok pok swag jean shorts jianbing. Celiac letterpress lo-fi you
          probably haven't heard of them salvia, hot chicken tofu direct trade
          irony. Photo booth chillwave vibecession unicorn succulents ramps,
          pickled blog shaman vice bruh tattooed. Chicharrones listicle poke,
          single-origin coffee gochujang austin portland +1.
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default OtherUserCards;
