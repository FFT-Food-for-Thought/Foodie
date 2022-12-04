import React, { useState, useEffect } from "react";
import db from "../db/firebase";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(15)
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data))
      );
  }, []);
  return (
    <div>
      {messages.map(({ id, text, photoURL }) => (
        <div key={id}>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
};

export default Chat;
