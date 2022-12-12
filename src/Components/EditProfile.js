import React, { useEffect, useState, useRef } from "react";
import { getLoggedUser } from "../db/users";
import { auth } from "../db/signup";
import { onAuthStateChanged } from "firebase/auth";
import { updateUser } from "../db/users";
import { StateSelect } from "./StateSelect";
import { preference } from "../db/tags";
import "../Css/editprofile.css";

const EditProfile = ({ openEditProfile, children, onEditProfileClose }) => {
  const [user, setUser] = useState({});
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();
  const bioRef = useRef();
  const preferenceRef = useRef();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      const newUser = await getLoggedUser();
      setUser(newUser);
    });
    return unsub;
  }, []);

  const handleUpdateProfile = () => {
    const userId = user.id;
    const email = emailRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const location = document.getElementById("location").value;
    const userName = userNameRef.current.value;
    const bio = bioRef.current.value;
    const preference = preferenceRef.current.value;
    updateUser(
      userId,
      email,
      firstName,
      lastName,
      userName,
      location,
      bio,
      preference
    );
  };

  if (!openEditProfile) return null;

  return (
    <>
      <div className="edit-profile-popup-overlay">
        <div className="edit-profile-popup">
          <div className="edit-profile-form-container">
            <div className="bio-input">
              <div>
                <button
                  onClick={onEditProfileClose}
                  className="edit-profile-close"
                >
                  X
                </button>
                {children}
              </div>
              <label>Email:</label>
              <input
                defaultValue={user.email}
                ref={emailRef}
                htmlFor="email"
                id="email"
                className="form-input"
                readOnly
              />
            </div>
            <div className="bio-input">
              <label>First Name:</label>
              <input
                defaultValue={user.firstName}
                ref={firstNameRef}
                htmlFor="firstName"
                id="firstName"
                className="form-input"
              />
            </div>
            <div className="bio-input">
              <label>Last Name:</label>
              <input
                defaultValue={user.lastName}
                ref={lastNameRef}
                htmlFor="lastName"
                id="lastName"
                className="form-input"
              />
            </div>
            <div className="bio-input">
              <label>UserName:</label>
              <input
                defaultValue={user.username}
                ref={userNameRef}
                className="form-input"
                htmlFor="username"
                id="username"
              />
            </div>
            <div className="bio-input">
              {/* <label>About Me:</label>
              <textarea
                defaultValue={user.bio}
                ref={bioRef}
                className="form-input"
                htmlFor="bio"
                id="bio"
                type="text"
              /> */}
              <label>About Me:</label>
              <textarea
                defaultValue={user.bio}
                id="bio"
                htmlFor="bio"
                className="form-input"
                rows="10"
                cols="40"
                maxlength="60"
                ref={bioRef}
                style={{ resize: "none" }}
              ></textarea>
            </div>
            <div className="bio-input">
              <label htmlFor="location">State:</label>
              <div className="select">
                <StateSelect userLocation={user.location} />
              </div>
            </div>
            <div className="bio-input">
              <label>Prefence:</label>
              <select
                ref={preferenceRef}
                name="tags"
                id="picturetags"
                className="add-photo-tags"
                defaultValue={user.preference}
              >
                {preference.map((tag) => {
                  return (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  );
                })}
              </select>
            </div>
            <button
              onClick={handleUpdateProfile}
              className="edit-profile-button"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
