import React from "react";
import ProfileMatchMessage from "./ProfileMatchMessage";
import ProfileNavbar from "./ProfileNavbar";
import "../Css/profile.css";

const ProfileSideBar = ({
  likedUsers,
  setSingleViewClicked,
  user,
  allUsers,
  removeLikedHandler,
}) => {
  console.log("profileSideBar", user, "and", likedUsers);

  return (
    <>
      <ProfileNavbar setSingleViewClicked={setSingleViewClicked} />
      <ProfileMatchMessage
        likedUsers={likedUsers}
        user={user}
        allUsers={allUsers}
        removeLikedHandler={removeLikedHandler}
      />
    </>
  );
};

export default ProfileSideBar;
