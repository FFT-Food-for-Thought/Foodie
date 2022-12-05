import React, { useState, useEffect } from "react";
import db from "../db/firebase";
import { getDoc, doc, query, where, onSnapshot } from "firebase/firestore";
import { addToChat } from "../db/messages";
import { orderBy } from "firebase/firestore";
import { getChat } from "../db/messages";
import { async } from "@firebase/util";
const Chat = ({ target, loggedInUser }) => {
  const docRef = doc(db, "messages", "AnrgW4l8uAwwSi0c8lM8");

  const handleMessage = async () => {
    const testMessage = await getDoc(docRef);
    console.log("test message", testMessage.data().chats[0].message);
    console.log("sentby", testMessage.data().chats[0].sentby);
    console.log(
      "at",
      new Date(
        testMessage.data().chats[0].timestamp.seconds * 1000
      ).toLocaleString()
    );
    console.log("test message", testMessage.data().chats[1].message);
    console.log("sentby", testMessage.data().chats[1].sentby);
    console.log(
      "at",
      new Date(
        testMessage.data().chats[1].timestamp.seconds * 1000
      ).toLocaleString()
    );
  };

  const handleGetChat = async () => {
    console.log("chatters", target, loggedInUser);
    console.log(await getChat("fhfUllMNrJD0ddRgT38Z", "c9cVD0WoaQQwJoSGbKND"));
  };
  return (
    <div>
      <button onClick={handleMessage}>Click Messages</button>
      <button
        onClick={() =>
          addToChat(
            "fhfUllMNrJD0ddRgT38Z",
            "c9cVD0WoaQQwJoSGbKND",
            "First",
            "Kyle"
          )
        }
      >
        hard code
      </button>
      <button onClick={handleGetChat}>getChat</button>
    </div>
  );
};

export default Chat;
