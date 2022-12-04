import React, { useState, useEffect } from "react";
import "../Css/profile.css";
import AddPhoto from "./AddPhoto";
import { logout } from "../db/signup";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../db/signup";
import { getLoggedUser } from "../db/users";
import { addProfilePicture } from "../db/pictures";
import { useNavigate, Link, useResolvedPath } from "react-router-dom";
import AllPhotos from "./AllPhotos";

const ProfileNavbar = ({ setSingleViewClicked }) => {
  const [isAddPhotoOpen, setAddPhotoIsOpen] = useState(false);
  const [isAllPhotoOpen, setAllPhotoIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handleSingleView = (e) => {
    e.preventDefault();
    setSingleViewClicked(true);
  };

  const [user, setUser] = useState({});
  console.log(">>>> NAVBAR", user.pictureBucket);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      const newUser = await getLoggedUser();
      setUser(newUser);

      console.log(">>> Auth state changed", user);
      console.log(">>> newUser is", newUser);
    });
    return unsub;
  }, []);
  console.log(">>> user is", user);

  return (
    <div className="profile-navbar-container">
      <div className="profile">
        <button className="btn profile-picture" onClick={handleSingleView}>
          <i class="fa-regular fa-user"></i>
        </button>
        <p className="first-name">{user.firstName}</p>
      </div>
      <div className="upload-photo">
        <button
          className="btn add-photo"
          onClick={() => setAddPhotoIsOpen(true)}
        >
          <i class="fa-solid fa-camera-retro"></i>
        </button>
        <div className="padding-right"></div>
        <AddPhoto
          openAddPhoto={isAddPhotoOpen}
          onAddPhotoClose={() => setAddPhotoIsOpen(false)}
        ></AddPhoto>
        <button
          onClick={() => setAllPhotoIsOpen(true)}
          className="btn view-all-photos"
        >
          <i class="fa-regular fa-images"></i>
        </button>
        <AllPhotos
          openAllPhotos={isAllPhotoOpen}
          onAllPhotoClose={() => setAllPhotoIsOpen(false)}
        ></AllPhotos>
        <div className="padding-right"></div>
        <button className="btn logout" onClick={handleLogout}>
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      </div>
    </div>
  );
};

export default ProfileNavbar;
