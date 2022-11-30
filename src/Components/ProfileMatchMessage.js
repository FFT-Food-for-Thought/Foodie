import React from "react";
import "../Css/profile.css";
import SingleMatchView from "./SingleMatchView";
const ProfileMatchMessage = ({ likedUsers }) => {
  const dummyData = ["Carina'sPFP, Kyle'PFP, PeterPFP, RobertPFP, THATGUYPFP"];
  return (
    <div className="matches">
      <div>
        {dummyData.map((profilePic) => {
          return <SingleMatchView profilePic={profilePic} />;
        })}
      </div>
      <div>Message Section</div>
    </div>
  );
};

export default ProfileMatchMessage;
