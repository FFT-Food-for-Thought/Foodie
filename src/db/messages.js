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
  collection,
  where,
} from "firebase/firestore";

export const addToChat = async (
  loggedInUserId,
  targetUserId,
  message,
  username
) => {
  const chatRoom = await getChat(loggedInUserId, targetUserId);
  const chatRoomId = chatRoom.id;

  const docRef = doc(db, "messages", chatRoomId);
  const updatedObject = {
    message,
    sentby: username,
    // timestamp: serverTimestamp(),
  };

  await updateDoc(docRef, { chats: arrayUnion(updatedObject) });
};
export const getChat = async (loggedInUserId, targetUserId) => {
  const chatRoomName = findChatFromTwo(loggedInUserId, targetUserId);
  const q = query(
    collection(db, "messages"),
    where("chatters", "==", chatRoomName)
  );
  const snapshot = await getDocs(q);
  const chatRoom = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return chatRoom[0];
};

// export const postToChat = async (
//   loggedInUserId,
//   targetUserId,
//   message,
//   username
// ) => {
//   const chatRoom = await getChat(loggedInUserId, targetUserId);
//   const chatRoomId = chatRoom.id;

// };

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
