import db from "./firebase";
import {
  updateDoc,
  getDocs,
  doc,
  getDoc,
  collection,
} from "firebase/firestore";

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
