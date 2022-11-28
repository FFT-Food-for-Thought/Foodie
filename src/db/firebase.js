import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2tNNzUsGibmNHEJGhleXbIzBwr_irklc",
  authDomain: "foodie-1ba1a.firebaseapp.com",
  projectId: "foodie-1ba1a",
  storageBucket: "foodie-1ba1a.appspot.com",
  messagingSenderId: "294427546042",
  appId: "1:294427546042:web:4f49a3a5e093576f06cd83",
};

//init firebase app
initializeApp(firebaseConfig);

//init database
const db = getFirestore();

//init getStorage
export const storage = getStorage();

//collection ref

export const userRef = collection(db, "Users");
// console.log(colRef);

//get collection data
getDocs(userRef).then((snapshot) => {
  let user = [];
  snapshot.docs.forEach((doc) => {
    user.push({ ...doc.data(), id: doc.id });
  });
});

export default db;
