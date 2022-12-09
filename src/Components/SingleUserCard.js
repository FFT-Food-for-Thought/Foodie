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
      <div className="profile-container">
        <img src={userPfp} alt="" className="user-profile-picture" />

        <div>
          <div
            className="single-user-profile-name
          "
          >
            {`${user.firstName} ${user.lastName}`}
          </div>
          <div className="single-user-username">{user.username}</div>

          <button
            onClick={() => setEditProfileIsOpen(true)}
            className="single-user-edit-profile"
          >
            Edit Profile
          </button>
          <EditProfile
            openEditProfile={isEditProfileOpen}
            onEditProfileClose={() => setEditProfileIsOpen(false)}
          ></EditProfile>
          <button
            onClick={() => setAddProfilePicIsOpen(true)}
            className="single-user-edit-picture"
          >
            Edit Profile Pic
          </button>
          <AddProfilePic
            openProfilePic={isAddProfilePicOpen}
            onProfilePicClose={() => setAddProfilePicIsOpen(false)}
            setUserPfp={setUserPfp}
          ></AddProfilePic>
        </div>
      </div>
    );
  } else {
    return (
      <div className="profile-container">
        <div className="single-user-profile-no-picture">No Picture</div>
        <div className="single-user-firstName-no-pic">
          {`${user.firstName} ${user.lastName}`}
        </div>
        <div className="single-user-username-no-pic">{user.username}</div>
        <button
          onClick={() => setAddProfilePicIsOpen(true)}
          className="single-user-edit-picture-button-no-picture"
        >
          Add Profile Pic
        </button>
        <AddProfilePic
          openProfilePic={isAddProfilePicOpen}
          onProfilePicClose={() => setAddProfilePicIsOpen(false)}
          setUserPfp={setUserPfp}
        ></AddProfilePic>

        <button
          onClick={() => setEditProfileIsOpen(true)}
          className="single-user-edit-button-no-picture"
        >
          Edit Profile
        </button>

        <EditProfile
          openEditProfile={isEditProfileOpen}
          onEditProfileClose={() => setEditProfileIsOpen(false)}
        ></EditProfile>
      </div>
    );
  }
};

export default SingleUserCard;
