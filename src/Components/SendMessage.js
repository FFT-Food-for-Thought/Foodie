import React, { useState } from "react";
import db from "../db/firebase";

function SendMessage() {
  const [msg, setMsg] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form>
        <input
          placeholder="Message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        ></input>
        <button type="submit" onSubmit={sendMessage}>
          Send
        </button>
      </form>
    </div>
  );
}

export default SendMessage;
