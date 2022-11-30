import db from "./firebase";
import {
  updateDoc,
  getDocs,
  doc,
  getDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { auth } from "./signup";

export const addPicture = async (imgUrl) => {
  const uid = auth.currentUser.uid;
  const userCol = collection(db, "Users");
  const q = query(userCol, where("userId", "==", uid));
  const snapshot = await getDocs(q);
  const userArray = snapshot.docs.map((doc) => {
    return { pictureBucket: doc.data().pictureBucket, id: doc.id };
  });
  const updatedBucket = [
    ...userArray[0].pictureBucket,
    {
      URL: imgUrl,
      tags: ["shellfish", "chocolate"],
    },
  ];
  const updateObj = {
    pictureBucket: updatedBucket,
  };
  const docRef = doc(db, "Users", userArray[0].id);
  await updateDoc(docRef, updateObj);
};
