import {
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import db from "./firebase";
import { makeUser } from "./users";

export const auth = getAuth();

export const signup = async (
  email,
  pw,
  lastName,
  firstName,
  username,
  location
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, pw)
      .then((credential) => {
        const userId = credential.user.uid;
        makeUser(userId, email, lastName, firstName, username, location);
      })
      .catch((error) => {
        window.alert(`${error.message}`);
      });
  } catch (error) {
    console.log("error in createuserwithemail", error);
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("error signing out", error);
  }
};

export const login = (email, password) => {
  try {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      console.log("error :>> ", error);
      window.alert("Incorrect Username/Password");
    });
  } catch (error) {
    console.log("error in login", error);
  }
};
