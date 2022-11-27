import {
  signOut,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import db from './firebase';

export const auth = getAuth();

export const signup = async (email, pw) => {
  await createUserWithEmailAndPassword(auth, email, pw);
};

export const logout = async () => {
  await signOut(auth);
};

export const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password);
};
