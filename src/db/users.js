import db from "./firebase";
import {
  addDoc,
  updateDoc,
  getDocs,
  doc,
  getDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { auth } from "./signup";

const userRef = collection(db, "Users");

export const getAllUsers = async () => {
  const users = await getDocs(userRef);
  let user = users.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  console.log("user :>> ", user);
};

//Test function with hardcoded ID
export const getUser = async () => {
  const docRef = doc(db, "Users", "fhfUllMNrJD0ddRgT38Z");
  const user = await getDoc(docRef);
  console.log("user :>> ", user.data());
};

//Test function with hardcoded ID
export const updateUser = async () => {
  const docRef = doc(db, "Users", "fhfUllMNrJD0ddRgT38Z");
  const update = { firstName: "Peter" };
  await updateDoc(docRef, update);
};

//Test get all info of a user based on uid?
export const getLoggedUser = async () => {
  const uid = auth.currentUser.uid;
  const userCol = collection(db, "Users");
  const q = query(userCol, where("userId", "==", uid));
  const snapshot = await getDocs(q);
  const userArray = snapshot.docs.map((doc) => {
    return doc.data();
  });

  return userArray[0];
};

export const makeUser = async (uid, email) => {
  const newUserObj = {
    userId: uid,
    email,
  };
  await addDoc(userRef, newUserObj);
};
