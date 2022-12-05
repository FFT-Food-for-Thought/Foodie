import React, { useState, useEffect } from "react";
import "../Css/profile.css";
import SingleMatchView from "./SingleMatchView";
import { getLikedPFP } from "../db/pictures";
import Chat from "./Chat";
import { removeLike } from "../db/users";
const ProfileMatchMessage = ({ likedUsers, user }) => {
  // const dummyData = ["Carina'sPFP, Kyle'PFP, PeterPFP, RobertPFP, THATGUYPFP"];
  const [match, setMatch] = useState(true);
  const [message, setMessage] = useState(false);
  const [likedList, setLikedList] = useState([]);

  useEffect(() => {
    const unsub = async () => {
      const pfpList = await Promise.all(
        likedUsers.map(async (targetObj) => {
          const URL = await getLikedPFP(targetObj.userId);
          console.log("targetObj", targetObj);
          return { URL, name: targetObj.name, userId: targetObj.userId };
        })
      );
      console.log("after pfplist", pfpList);
      setLikedList(pfpList);
    };
    unsub();
  }, []);

  const removeLikedHandler = (userObj) => {
    const objectToRemove = {
      name: userObj.name,
      userId: userObj.userId,
    };
    console.log(objectToRemove);

    removeLike(user.id, objectToRemove);

    const filtered = likedList.filter((userObj) => {
      if (userObj.userId != objectToRemove.userId) {
        return userObj;
      }
    });
    console.log(filtered);
    setLikedList(filtered);

    //updateLikedList to remove the removed person
  };

  const toggleMatches = (e) => {
    e.preventDefault();
    console.log(likedList);
    setMessage(false);
    setMatch(true);
  };

  const toggleMessasges = (e) => {
    e.preventDefault();
    setMessage(true);
    setMatch(false);
  };

  if (match)
    return (
      <div className="matches">
        <button onClick={toggleMatches}>Matches</button>
        <button onClick={toggleMessasges}>Messages</button>

        <div>
          {likedList.length &&
            likedList.map((likedObj) => {
              return (
                <div>
                  <SingleMatchView likedObj={likedObj} />;
                  <button
                    onClick={() => {
                      removeLikedHandler(likedObj);
                    }}
                  >
                    RemoveFromLike
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    );
  return (
    <div>
      <button onClick={toggleMatches}>Matches</button>
      <button onClick={toggleMessasges}>Messages</button>
      <Chat />
    </div>
  );
};

export default ProfileMatchMessage;
