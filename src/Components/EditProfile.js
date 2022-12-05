import React, { useEffect, useState, useRef } from "react";
import { getLoggedUser } from "../db/users";
import { auth } from "../db/signup";
import { onAuthStateChanged } from "firebase/auth";
import { updateUser } from "../db/users";
import { StateSelect } from "./StateSelect";

const EditProfile = () => {
  const [user, setUser] = useState({});
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const userNameRef = useRef();

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
    updateUser(userId, email, firstName, lastName, userName, location);
  };

  return (
    <>
      <div className="form-container">
        <input
          defaultValue={user.email}
          ref={emailRef}
          htmlFor="email"
          id="email"
          className="form-input"
        />
        <input
          defaultValue={user.firstName}
          ref={firstNameRef}
          htmlFor="firstName"
          id="firstName"
          className="form-input"
        />
        <input
          defaultValue={user.lastName}
          ref={lastNameRef}
          htmlFor="lastName"
          id="lastName"
          className="form-input"
        />
        <input
          defaultValue={user.username}
          ref={userNameRef}
          className="form-input"
          htmlFor="username"
          id="username"
        />
        <label htmlFor="location" className="state">
          State:
        </label>
        <div className="select">
          <StateSelect userLocation={user.location} />
        </div>
        <button onClick={handleUpdateProfile} className="signup-button">
          Update Profile
        </button>
      </div>
    </>
  );
};

export default EditProfile;
