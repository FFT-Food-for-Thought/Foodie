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

export const addToChat = async (chatRoomId, loggedInUserId) => {
  const docRef = doc(db, "messages", chatRoomId);
  const updatedObject = {
    message: "goodbye",
    sentby: loggedInUserId,
    // timestamp: serverTimestamp(),
  };

  await updateDoc(docRef, { chats: arrayUnion(updatedObject) });
};
export const getChat = async (loggedInUserId, targetUserId) => {
  const q = query(
    collection(db, "messages"),
    where("user1.userId", "==", loggedInUserId),
    where("user2.userId", "==", targetUserId)
  );
  const snapshot = await getDocs(q);
  const chatRoom = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return chatRoom[0];
};
