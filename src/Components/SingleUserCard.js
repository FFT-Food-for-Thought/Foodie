import React, { useEffect, useState } from "react";
import "../Css/singleuser.css";
import AddProfilePic from "./AddProfilePic";
import EditProfile from "./EditProfile";
import { getMyProfilePicture } from "../db/pictures";
const SingleUserCard = ({ user }) => {
  const [isAddProfilePicOpen, setAddProfilePicIsOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileIsOpen] = useState(false);
  const [userPfp, setUserPfp] = useState("");
  useEffect(() => {
    const _getPfp = async () => {
      const pfpUrl = await getMyProfilePicture();
      console.log("userPfp url", pfpUrl);
      if (pfpUrl) {
        setUserPfp(pfpUrl);
      }
      console.log("userpfp state", userPfp);
    };
    _getPfp();
  }, []);

  if (userPfp) {
    return (
      <div>
        <img src={userPfp} alt="" />
        <button onClick={() => setAddProfilePicIsOpen(true)}>
          Edit Profile Pic
        </button>
        <AddProfilePic
          openProfilePic={isAddProfilePicOpen}
          onProfilePicClose={() => setAddProfilePicIsOpen(false)}
          setUserPfp={setUserPfp}
        ></AddProfilePic>
        <button onClick={() => setEditProfileIsOpen(true)}>Edit Profile</button>
        <EditProfile
          openEditProfile={isEditProfileOpen}
          onEditProfileClose={() => setEditProfileIsOpen(false)}
        ></EditProfile>
        <h1>{user.firstName}</h1>
      </div>
    );
  } else {
    return (
      <div>
        <div className="single-user-firstName">{user.firstName}NO PIC</div>

        <button onClick={() => setAddProfilePicIsOpen(true)}>
          Add Profile Pic
        </button>
        <AddProfilePic
          openProfilePic={isAddProfilePicOpen}
          onProfilePicClose={() => setAddProfilePicIsOpen(false)}
          setUserPfp={setUserPfp}
        ></AddProfilePic>
        <button onClick={() => setEditProfileIsOpen(true)}>Edit Profile</button>
        <EditProfile
          openEditProfile={isEditProfileOpen}
          onEditProfileClose={() => setEditProfileIsOpen(false)}
        ></EditProfile>
      </div>
    );
  }
};

export default SingleUserCard;
