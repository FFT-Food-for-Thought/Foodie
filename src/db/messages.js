import db from "./firebase";
import {
  getDoc,
  addDoc,
  getDocs,
  query,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  Timestamp,
  collection,
  where,
} from "firebase/firestore";

export const addToChat = async (
  loggedInUserId,
  targetUserId,
  message,
  username
) => {
  try {
    const chatRoom = await getChat(loggedInUserId, targetUserId);
    if (chatRoom.chatters) {
      console.log("created chat updating only");
      const chatRoomId = chatRoom.id;

      const docRef = doc(db, "messages", chatRoomId);
      const updatedObject = {
        message,
        sentby: username,
        timestamp: Timestamp.now(),
      };

      await updateDoc(docRef, { chats: arrayUnion(updatedObject) });
    } else {
      console.log("created chat creating new");
      const chatRoomId = findChatFromTwo(loggedInUserId, targetUserId);
      const newChatDoc = {
        chatters: chatRoomId,
        chats: [
          {
            message,
            sentby: username,
            timestamp: Timestamp.now(),
          },
        ],
      };
      const chatRef = collection(db, "messages");
      await addDoc(chatRef, newChatDoc);
    }
  } catch (error) {
    console.log("error in addChat", error);
  }
};

export const createDefaultChat = async (combinedId) => {
  const chatRef = collection(db, "messages");
  const emptyChat = { chatters: combinedId };
  await addDoc(chatRef, emptyChat);
};

export const getChat = async (loggedInUserId, targetUserId) => {
  try {
    const chatRoomName = findChatFromTwo(loggedInUserId, targetUserId);
    const q = query(
      collection(db, "messages"),
      where("chatters", "==", chatRoomName)
    );
    const snapshot = await getDocs(q);
    const chatRoom = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    console.log("chatroom obj", chatRoom);
    return chatRoom[0];
  } catch (error) {
    console.log("error in getChat", error);
  }
};

export const getChatroomDocId = async (loggedInUserId, targetUserId) => {
  try {
    const chatRoomName = findChatFromTwo(loggedInUserId, targetUserId);
    const q = query(
      collection(db, "messages"),
      where("chatters", "==", chatRoomName)
    );
    const snapshot = await getDocs(q);
    const chatRoom = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    console.log("chatroom obj", chatRoom);
    return chatRoom[0];
  } catch (error) {
    console.log("error in getChat", error);
  }
};

//helper functions
//concat two users name alphabetically for a unique room id
export const findChatFromTwo = (user1, user2) => {
  let chatter1;
  let chatter2;
  if (user1 < user2) {
    chatter1 = user1;
    chatter2 = user2;
  } else {
    chatter1 = user2;
    chatter2 = user1;
  }

  const chatRoomName = chatter1 + chatter2;
  console.log(chatter1 + chatter2);
  return chatRoomName;
};
