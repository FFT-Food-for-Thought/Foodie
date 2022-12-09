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
  listAll,
} from "firebase/storage";

const PROFILE_PIC_REF = "gs://foodie-1ba1a.appspot.com/profilePics/";

export const addPicture = async (imgUrl, imageName, tags) => {
  try {
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
        tags,
        imageName,
      },
    ];
    const updateObj = {
      pictureBucket: updatedBucket,
    };
    const docRef = doc(db, "Users", userArray[0].id);
    await updateDoc(docRef, updateObj);
  } catch (error) {
    console.log("error in add picture", error);
  }
};

//mayhave to do a delete first?
export const addProfilePicture = async (image) => {
  try {
    const uid = auth.currentUser.uid;
    const imageRef = ref(storage, `profilePics/${uid}/profilePic.jpg`);
    await uploadBytes(imageRef, image);
    alert("profile picture updated");
    const URL = await getDownloadURL(imageRef);
    return URL;
  } catch (error) {
    console.log("error in addpfp", error);
  }
};

export const deleteProfilePicture = async () => {
  try {
    const uid = auth.currentUser.uid;
    const imageRef = ref(storage, `profilePics/${uid}/profilePic.jpg`);
    const res = await listAll(imageRef);
    if (res.items.length) {
      deleteObject(imageRef).catch((err) =>
        console.log("error in Delete Profile Picture :>> ", err)
      );
    }
  } catch (error) {
    console.log("error in Delete Profile Picture :>> ", error);
  }
};

export const getMyProfilePicture = async () => {
  try {
    const uid = auth.currentUser.uid;
    const imageRef = ref(storage, `${PROFILE_PIC_REF}${uid}/profilePic.jpg`);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (error) {
    console.log("error in get mypfp", error);
  }
};

export const getLikedPFP = async (targetUserId) => {
  try {
    const imageRef = ref(
      storage,
      `${PROFILE_PIC_REF}${targetUserId}/profilePic.jpg`
    );
    if (imageRef) {
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    }
  } catch (error) {
    console.log("error getting pfp", error);
  }
};

export const deletePhoto = async (userId, imageName, idx) => {
  try {
    const userCol = collection(db, "Users");
    const q = query(userCol, where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const userArray = snapshot.docs.map((doc) => {
      return { pictureBucket: doc.data().pictureBucket, id: doc.id };
    });
    const docRef = doc(db, "Users", userArray[0].id);
    console.log("userArray[0].pictureBucket :>> ", userArray[0].pictureBucket);
    const updatedBucket = userArray[0].pictureBucket.filter(
      (e, i) => i !== idx
    );

    const updateObj = {
      pictureBucket: updatedBucket,
    };

    console.log("updateObj.pictureBucket :>> ", updateObj.pictureBucket);
    const pictureRef = ref(storage, `${userId}/${imageName}`);
    deleteObject(pictureRef);

    await updateDoc(docRef, updateObj);

    return updatedBucket;
  } catch (error) {
    console.log("error in delete photos", error);
  }
};
