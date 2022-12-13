import React, { useState, useEffect } from "react";
import "../Css/profile.css";
import SingleMatchView from "./SingleMatchView";
import { getLikedPFP } from "../db/pictures";
import Chat from "./Chat";
import { removeLike } from "../db/users";
const ProfileMatchMessage = ({
  setMatchedViewClicked,
  setSingleViewClicked,
  likedUsers,
  user,
  allUsers,
  removeLikedHandler,
  currentMatch,
  setCurrentMatch,
}) => {
  const [match, setMatch] = useState(true);
  const [message, setMessage] = useState(false);
  const [likedList, setLikedList] = useState([]);
  const [chatUnsub, setChatUnsub] = useState(() => {});
  const [unSub, setunSub] = useState({});
  console.log("in profilematchmessage, currentmatch", currentMatch);
  console.log("unsube state in profilematchmessage", unSub);
  useEffect(() => {
    const unsub = async () => {
      const pfpList = await Promise.all(
        likedUsers.map(async (targetObj) => {
          const URL = await getLikedPFP(targetObj.userId);
          console.log("targetObj>>>", targetObj);
          let singleUser;
          for (let i = 0; i < allUsers.length; i++) {
            const userObj = allUsers[i];
            if (userObj.userId === targetObj.userId) {
              singleUser = { ...userObj };
              break;
            }
          }
          // return { URL, name: targetObj.name, userId: targetObj.userId };
          return { ...targetObj, URL, ...singleUser };
        })
      );
      console.log("after pfplist>>>>", pfpList);
      setLikedList(pfpList);
    };
    unsub();
  }, [likedUsers.length]);
  console.log("profilematchview rendered", likedList, "and", likedUsers);
  // const removeLikedHandler = (userObj) => {
  //   const objectToRemove = {
  //     name: userObj.name,
  //     userId: userObj.userId,
  //   };
  //   console.log(objectToRemove);

  //   removeLike(user.id, objectToRemove);

  //   const filtered = likedList.filter((userObj) => {
  //     if (userObj.userId != objectToRemove.userId) {
  //       return userObj;
  //     }
  //   });
  //   console.log(filtered);
  //   setLikedList(filtered);

  //   //updateLikedList to remove the removed person
  // };

  const toggleMatches = (e) => {
    e.preventDefault();
    console.log(likedList);
    setMessage(false);
    setMatch(true);

    if (unSub.unsub) {
      unSub.unsub();
      console.log(
        "this is unsube after clicking toggle match",
        unSub,
        "match",
        match
      );
    }
  };

  const toggleMessasges = (e) => {
    e.preventDefault();
    setMessage(true);
    setMatch(false);

    if (unSub.unsub) {
      unSub.unsub();
      console.log(
        "this is unsube after clicking toggle message",
        unSub,
        "match",
        unSub
      );
    }
  };

  if (match)
    return (
      <div className="matches">
        <div className="match-container">
          <div className="match-message-navbar">
            <div>
              <button onClick={toggleMatches} className="match-button">
                Matches
              </button>
            </div>
            <div>
              <button onClick={toggleMessasges} className="message-button">
                Messages
              </button>
            </div>
          </div>

          <div className="">
            {likedList.length &&
              likedList.map((likedObj) => {
                return (
                  <div
                    className="matched-users-container"
                    key={likedObj.userId}
                  >
                    <SingleMatchView
                      setMatchedViewClicked={setMatchedViewClicked}
                      setSingleViewClicked={setSingleViewClicked}
                      onClick={console.log(likedObj)}
                      likedObj={likedObj}
                      setCurrentMatch={setCurrentMatch}
                      loggedInUser={user}
                    />
                    <button
                      className="matched-profile-button"
                      onClick={() => {
                        setCurrentMatch(likedObj);
                        setSingleViewClicked(false);
                        setMatchedViewClicked(true);
                        setMatch(false);
                        setMessage(true);
                        console.log(
                          "this is unsube after clicking nam",
                          unSub,
                          "match",
                          match
                        );
                        if (unSub.unsub) {
                          unSub.unsub();
                          console.log("yes it is peter", likedObj);
                        }
                      }}
                    >
                      {likedObj.firstName} {likedObj.lastName}
                    </button>
                    <button
                      className="match-remove-button"
                      onClick={() => {
                        removeLikedHandler(likedObj);
                      }}
                    >
                      Remove Match
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  return (
    //added this div, KYLE, don't hate me, signed -P.N
    <div className="matches">
      <div className="match-container">
        <div className="match-message-navbar">
          <div>
            <button onClick={toggleMatches} className="match-toggled-button">
              Matches
            </button>
          </div>
          <div>
            <button
              onClick={toggleMessasges}
              className="message-toggled-button"
            >
              Messages
            </button>
          </div>
        </div>
        <Chat
          currentMatch={currentMatch}
          loggedInUser={user}
          setunSub={setunSub}
        />
      </div>
    </div>
  );
};

export default ProfileMatchMessage;
