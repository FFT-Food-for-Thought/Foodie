import React, { useState, useEffect } from "react";

import { getAllUsers } from "../db/users";
import SingleProfileCard from "./SingleProfileCard";

const OtherUserCards = () => {
  const [currentUser, setCurrentUser] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const _getUsers = async (users) => {
      const newUser = await getAllUsers();
      setUsers(newUser);

      console.log("Fetched all users", users);
    };
    _getUsers();
  }, []);
  console.log("more fetches", users);
  if (users.length) {
    return (
      <div>
        <SingleProfileCard user={users[currentUser]} />
        <button
          onClick={() => {
            currentUser < users.length - 1 && setCurrentUser(currentUser + 1);
          }}
        >
          {"Like"}
        </button>
        <button
          onClick={() => {
            currentUser < users.length - 1 && setCurrentUser(currentUser + 1);
          }}
        >
          {"Next"}
        </button>
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default OtherUserCards;
