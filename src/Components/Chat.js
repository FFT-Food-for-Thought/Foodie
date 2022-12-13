import React, { useState, useEffect, useRef } from "react";
import db from "../db/firebase";
import "../Css/chat.css";
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

const Chat = ({ loggedInUser, currentMatch, setunSub }) => {
  const [chat, setChat] = useState({});
  const [chatId, setChatId] = useState("");

  const messageRef = useRef();
  //need regular ids
  const targetId = currentMatch.id;
  const loggedId = loggedInUser.id;
  const sender = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
  console.log("unsube Chat rendered");
  useEffect(() => {
    console.log("unsube useeffect");
    let chatId;
    const _getId = async () => {
      console.log("in get Id");
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
        console.log("unsube, doc", doc);
        console.log("unsube calling onSnapshot", doc.data());
        setChat(doc.data());
      });
      console.log("this is unsube from onsnapsho", unSubChat);
      setunSub({ unsub: unSubChat });
      console.log("this is unsube from onsnapsho after setting", unSubChat);
      return () => unSubChat();
    };
    console.log("unsube running useeffect");
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
      <div className="chat-container">
        {chat.chats.map((messageObj) => {
          return (
            <div>
              <div className="messages-container">
                <h5>
                  from: {messageObj.sentby}{" "}
                  {new Date(messageObj.timestamp.seconds * 1000).toDateString()}
                </h5>
              </div>
              <div className="chat">-{messageObj.message}</div>
            </div>
          );
        })}
        <div className="chat-input-container">
          <input ref={messageRef} type={"text"}></input>
        </div>
        <div className="submit-container">
          <button onClick={handleMessageSubmit} className="submit-button">
            Send
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="chat-container">
        <div className="no-chat">No Chat send a message</div>
        <div className="chat-input-container">
          <input ref={messageRef} type={"text"}></input>
        </div>
        <div className="submit-container">
          <button onClick={handleMessageSubmit} className="submit-button">
            Send
          </button>
        </div>
      </div>
    );
  }
};

export default Chat;
