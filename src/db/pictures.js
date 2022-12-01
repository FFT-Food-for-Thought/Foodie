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
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export const addPicture = async (imgUrl, imageName) => {
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
      imageName,
    },
  ];
  const updateObj = {
    pictureBucket: updatedBucket,
  };
  const docRef = doc(db, "Users", userArray[0].id);
  await updateDoc(docRef, updateObj);
};

export const addProfilePicture = async (image) => {
  const uid = auth.currentUser.uid;
  const imageRef = ref(storage, `profilePics/${uid}/profilePic`);
  await uploadBytes(imageRef, image);
  alert("profile picture updated");
  const URL = await getDownloadURL(imageRef);
  return URL;
};

export const deletePhoto = async (userId, imageName) => {
  const pictureRef = ref(storage, `${userId}/${imageName}`);

  deleteObject(pictureRef);
};
