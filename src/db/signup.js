import {
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import db from "./firebase";
import { makeUser } from "./users";

export const auth = getAuth();

export const signup = async (email, pw) => {
  await createUserWithEmailAndPassword(auth, email, pw)
    .then((credential) => {
      const userId = credential.user.uid;
      makeUser(userId, email);
    })
    .catch((error) => {
      // window.alert("Password must be 6 characters or more");
      window.alert(`${error.message}`);
    });
};

export const logout = async () => {
  await signOut(auth);
};

export const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password).catch((error) => {
    console.log("error :>> ", error);
    window.alert("Incorrect Username/Password");
  });
};
