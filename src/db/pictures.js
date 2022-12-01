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
import { storage } from "./firebase";
import { auth } from "./signup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const PROFILE_PIC_REF = "gs://foodie-1ba1a.appspot.com/profilePics/";

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

//mayhave to do a delete first?
export const addProfilePicture = async (image) => {
  const uid = auth.currentUser.uid;
  const imageRef = ref(storage, `profilePics/${uid}/profilePic.jpg`);
  await uploadBytes(imageRef, image);
  alert("profile picture updated");
  const URL = await getDownloadURL(imageRef);
  return URL;
};

export const getMyProfilePicture = async () => {
  const uid = auth.currentUser.uid;
  const imageRef = ref(storage, `${PROFILE_PIC_REF}${uid}/profilePic.jpg`);
  const imageUrl = await getDownloadURL(imageRef);
  return imageUrl;
};

export const getLikedPFP = async (targetUserId) => {
  const imageRef = ref(
    storage,
    `${PROFILE_PIC_REF}${targetUserId}/profilePic.jpg`
  );
  const imageUrl = await getDownloadURL(imageRef);
  return imageUrl;
};
