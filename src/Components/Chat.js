import React, { useState, useEffect, useRef } from "react";
import db from "../db/firebase";
import {
  getDoc,
  doc,
  query,
  where,
  onSnapshot,
  getDocs,
  collection,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { addToChat, getChat, findChatFromTwo } from "../db/messages";

import { async } from "@firebase/util";
const Chat = ({ loggedInUser, currentMatch, setunSub }) => {
  const [chat, setChat] = useState({});
  const [chatId, setChatId] = useState("");

  const messageRef = useRef();
  //need regular ids
  const targetId = currentMatch.id;
  const loggedId = loggedInUser.id;
  const sender = `${loggedInUser.firstName} ${loggedInUser.lastName}`;

  useEffect(() => {
    let chatId;
    const _getId = async () => {
      const chatRoomName = findChatFromTwo(loggedId, targetId);
      const q = query(
        collection(db, "messages"),
        where("chatters", "==", chatRoomName)
      );
      const snapshot = await getDocs(q);
      const chatRoom = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      console.log("useeffect chatroom", chatRoom);
      setChatId(chatRoom[0].id);
      chatId = chatRoom[0].id;
      console.log("in onsnapshot", chatId);
      const unSubChat = onSnapshot(doc(db, "messages", chatId), (doc) => {
        console.log(doc.data());
        setChat(doc.data());
      });
      setunSub({ unsub: unSubChat });
      return () => unSubChat();
    };
    return () => _getId();
  }, []);

  //use a useEffect to get chat?
  // useEffect(() => {
  //   console.log("unsub initial state", unSub);
  //   const _get_chat = async () => {
  //     const chatroom = await getChat(loggedId, targetId);
  //     if (chatroom.chats) {
  //       setChat(chatroom);
  //       console.log("here", chatroom);
  //       if (chatroom.id) {
  //         const unSubChat = onSnapshot(
  //           doc(db, "messages", chatroom.id),
  //           (doc) => {
  //             console.log(doc.data());
  //           }
  //         );
  //         console.log("this is what unsubchat is", unSubChat);
  //         const test = { test: unSubChat };
  //         console.log(test);
  //         setunSub(test);
  //         console.log(unSub);
  //       }
  //     } else {
  //       setChat({
  //         chats: "",
  //         timestamp: { seconds: Timestamp.now() },
  //       });
  //     }
  //   };
  //   _get_chat();
  // }, []);

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
