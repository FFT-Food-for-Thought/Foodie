import React, { useState, useEffect } from "react";
import "../Css/profile.css";
import SingleMatchView from "./SingleMatchView";
import { getLikedPFP } from "../db/pictures";
import Chat from "./Chat";
const ProfileMatchMessage = ({ likedUsers }) => {
  const dummyData = ["Carina'sPFP, Kyle'PFP, PeterPFP, RobertPFP, THATGUYPFP"];
  const [match, setMatch] = useState(true);
  const [message, setMessage] = useState(false);
  const [likedList, setLikedList] = useState([]);

  useEffect(() => {
    const unsub = async () => {
      const pfpList = await Promise.all(

        likedUsers.map(async (targetObj) => {
          const URL = await getLikedPFP(targetObj.userId);
          console.log("targetObj", targetObj);
          return { URL, name: targetObj.name };

        })
      );
      console.log("after pfplist", pfpList);
      setLikedList(pfpList);
    };
    unsub();
  }, []);

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
              return <SingleMatchView likedObj={likedObj} />;
            })}
        </div>
      </div>
    );
  return (
    <div>
      <button onClick={toggleMatches}>Matches</button>
      <button onClick={toggleMessasges}>Messages</button>
      {/* <Chat /> */}
      <div>Hello</div>
    </div>
  );
};

export default ProfileMatchMessage;
