import React from "react";
import ProfileMatchMessage from "./ProfileMatchMessage";
import ProfileNavbar from "./ProfileNavbar";
import "../Css/profile.css";

const ProfileSideBar = ({
  likedUsers,
  setSingleViewClicked,
  setMatchedViewClicked,
  user,
  allUsers,
  setCurrentMatch,
  removeLikedHandler,
}) => {
  console.log("profileSideBar", user, "and", likedUsers);

  return (
    <>
      <ProfileNavbar
        setSingleViewClicked={setSingleViewClicked}
        setMatchedViewClicked={setMatchedViewClicked}
      />
      <ProfileMatchMessage
        likedUsers={likedUsers}
        user={user}
        setCurrentMatch={setCurrentMatch}
        setSingleViewClicked={setSingleViewClicked}
        setMatchedViewClicked={setMatchedViewClicked}
        allUsers={allUsers}
        removeLikedHandler={removeLikedHandler}
        setClicked
      />
    </>
  );
};

export default ProfileSideBar;
