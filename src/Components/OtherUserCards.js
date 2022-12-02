import React, { useState, useEffect } from "react";

import { getAllUsers } from "../db/users";
import SingleProfileCard from "./SingleProfileCard";

const OtherUserCards = ({ loggedInUser }) => {
  const [currentUser, setCurrentUser] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const _getUsers = async (users) => {
      //returns array of all users in Users
      const newUser = await getAllUsers();
      console.log("in useEffect", newUser);
      const onlyOthers = newUser.filter((userObj) => {
        if (userObj.userId !== loggedInUser.userId) {
          return userObj;
        }
      });
      setUsers(onlyOthers);

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
        <div id="infoDiv">
          This is {users[currentUser].firstName}'s info. Taiyaki slow-carb
          flannel green juice vinyl cray. Polaroid ascot aesthetic wolf banjo
          skateboard. IPhone la croix snackwave leggings jean shorts tumblr,
          viral neutra. Brunch everyday carry vexillologist yuccie selfies.
          Actually flexitarian chia knausgaard normcore Brooklyn. Etsy actually
          vexillologist 8-bit, vice snackwave scenester tilde locavore taiyaki.
          Pok pok swag jean shorts jianbing. Celiac letterpress lo-fi you
          probably haven't heard of them salvia, hot chicken tofu direct trade
          irony. Photo booth chillwave vibecession unicorn succulents ramps,
          pickled blog shaman vice bruh tattooed. Chicharrones listicle poke,
          single-origin coffee gochujang austin portland +1.
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default OtherUserCards;
