import React, { useState, useEffect, useRef } from "react";
import db from "../db/firebase";
import { getDoc, doc, query, where, onSnapshot } from "firebase/firestore";
import { addToChat, getChat } from "../db/messages";
import { orderBy } from "firebase/firestore";

import { async } from "@firebase/util";
const Chat = ({ loggedInUser, currentMatch }) => {
  const [chat, setChat] = useState({});
  const messageRef = useRef();
  //need regular ids
  const targetId = currentMatch.id;
  const loggedId = loggedInUser.id;
  const sender = `${loggedInUser.firstName} ${loggedInUser.lastName}`;

  //use a useEffect to get chat?
  useEffect(() => {
    const _get_chat = async () => {
      const chatroom = await getChat(loggedId, targetId);
      if (chatroom.chats) {
        setChat(chatroom);
        console.log("here", chatroom);
      } else {
        setChat({
          chats: "",
        });
      }
    };
    _get_chat();
  }, []);

  const handleMessageSubmit = async () => {
    if (messageRef.current.value) {
      console.log("this will be put in add chat", messageRef.current.value);
      console.log("LoggedInUser", loggedInUser, "currentMatcH", currentMatch);
      await addToChat(loggedId, targetId, messageRef.current.value, sender);
    } else {
      alert("Please type in a message");
    }
  };
  console.log("in chat", chat);
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

  if (chat.chats) {
    return (
      <>
        {chat.chats.map((messageObj) => {
          return (
            <div>
              <p>
                from:{messageObj.sentby}
                {new Date(messageObj.timestamp.seconds * 1000).toDateString()}
              </p>
              <p>{messageObj.message}</p>
            </div>
          );
        })}
        <input ref={messageRef} type={"text"}></input>
        <button onClick={handleMessageSubmit}>Submit</button>
      </>
    );
  } else {
    return (
      <div>
        <p>No Chat send a message</p>
        <input ref={messageRef} type={"text"}></input>
        <button onClick={handleMessageSubmit}>Submit</button>
      </div>
    );
  }
};

export default Chat;
