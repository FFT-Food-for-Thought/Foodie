import React, { useState } from "react";
import MatchedProfile from "./MatchedProfile";
const SingleMatchView = ({ likedObj }) => {
  const [isMatchedCardOpen, setMatchCard] = useState(false);
  console.log("singlematchview profilepic", likedObj);

  if (likedObj.URL) {
    return (
      <>
        <img src={likedObj.URL} alt="profilepic" className="match-img" />
        <p>{likedObj.name}</p>
        <button
          onClick={() => {
            setMatchCard(true);
            console.log("setmatchtrue");
          }}
        >
          Profile
        </button>
        <MatchedProfile
          isMatchedCardOpen={isMatchedCardOpen}
          setMatchCard={setMatchCard}
          user={likedObj}
        />
      </>
    );
  } else {
    return (
      <>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt="profilepic"
          className="match-img"
        />
        <p>{likedObj.name}</p>
        <button
          onClick={() => {
            setMatchCard(true);
            console.log("setmatchtrue");
          }}
        >
          Profile
        </button>
        <MatchedProfile
          isMatchedCardOpen={isMatchedCardOpen}
          setMatchCard={setMatchCard}
          user={likedObj}
        />
      </>
    );
  }
};

export default SingleMatchView;
