import React, { useState, useEffect, useRef } from "react";
import db from "../db/firebase";
import { getDoc, doc, query, where, onSnapshot } from "firebase/firestore";
import { addToChat, getChat } from "../db/messages";
import { orderBy } from "firebase/firestore";

import { async } from "@firebase/util";
const Chat = ({ loggedInUser, currentMatch }) => {
  const messageRef = useRef();
  //need regular ids
  const targetId = currentMatch.id;
  const loggedId = loggedInUser.id;
  const sender = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
  const handleMessageSubmit = async () => {
    if (messageRef.current.value) {
      console.log("this will be put in add chat", messageRef.current.value);
      console.log("LoggedInUser", loggedInUser, "currentMatcH", currentMatch);
      await addToChat(loggedId, targetId, messageRef.current.value, sender);
    } else {
      alert("Please type in a message");
    }
  };
  console.log("in chat", currentMatch);
  // const docRef = doc(db, "messages", "AnrgW4l8uAwwSi0c8lM8")
  // const handleMessage = async () => {
  //   const testMessage = await getDoc(docRef);
  //   console.log("test message", testMessage.data().chats[0].message);
  //   console.log("sentby", testMessage.data().chats[0].sentby);
  //   console.log(
  //     "at",
  //     new Date(
  //       testMessage.data().chats[0].timestamp.seconds * 1000
  //     ).toLocaleString()
  //   );
  //   console.log("test message", testMessage.data().chats[1].message);
  //   console.log("sentby", testMessage.data().chats[1].sentby);
  //   console.log(
  //     "at",
  //     new Date(
  //       testMessage.data().chats[1].timestamp.seconds * 1000
  //     ).toLocaleString()
  //   );
  // };
  // const handleGetChat = async () => {
  //   console.log("chatters", target, loggedInUser);
  //   console.log(await getChat("fhfUllMNrJD0ddRgT38Z", "c9cVD0WoaQQwJoSGbKND"));
  // };
  // return (
  //   <div>
  //     <button onClick={handleMessage}>Click Messages</button>
  //     <button
  //       onClick={() =>
  //         addToChat(
  //           "fhfUllMNrJD0ddRgT38Z",
  //           "c9cVD0WoaQQwJoSGbKND",
  //           "skynet",
  //           "Kyle"
  //         )
  //       }
  //     >
  //       hard code
  //     </button>
  //     <button onClick={handleGetChat}>getChat</button>
  //   </div>
  // );
  return (
    <>
      <input ref={messageRef} type={"text"}></input>
      <button onClick={handleMessageSubmit}>Submit</button>
    </>
  );
};

export default Chat;
