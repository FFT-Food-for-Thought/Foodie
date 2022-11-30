import React, { useState } from "react";
import "../Css/profile.css";
import SingleMatchView from "./SingleMatchView";
const ProfileMatchMessage = ({ likedUsers }) => {
  const dummyData = ["Carina'sPFP, Kyle'PFP, PeterPFP, RobertPFP, THATGUYPFP"];
  const [match, setMatch] = useState(true);
  const [message, setMessage] = useState(false);

  const toggleMatches = (e) => {
    e.preventDefault();
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
          {dummyData.map((profilePic) => {
            return <SingleMatchView profilePic={profilePic} />;
          })}
        </div>
      </div>
    );
  return (
    <div>
      <button onClick={toggleMatches}>Matches</button>
      <button onClick={toggleMessasges}>Messages</button>
      <div>Hello</div>
    </div>
  );
};

export default ProfileMatchMessage;
