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
  return user;
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

export const makeUser = async (
  uid,
  email,
  lastName,
  firstName,
  username,
  location
) => {
  const newUserObj = {
    userId: uid,
    email,
    lastName,
    firstName,
    username,
    location,
    pictureBucket: [],
  };
  await addDoc(userRef, newUserObj);
};

export const addReviewToReviewee = async (revieweeId, review) => {
  try {
    const docRef = doc(db, "Users", revieweeId);
    const reviewee = await getDoc(db, "Users", revieweeId);
    const revieweeInfo = reviewee.data();
    const reviews = revieweeInfo.reviews;

    const updatedReviews = [...reviews, review];

    const updateObject = {
      reviews: updatedReviews,
    };
    await updateDoc(docRef, updateObject);
  } catch (error) {
    console.log("error in addReviewToRevieww", error);
  }
};

export const addReviewToReviewer = async (reviewerId, review) => {
  try {
    const docRef = doc(db, "Users", reviewerId);
    const reviewer = await getDoc(db, "Users", reviewerId);
    const reviewerInfo = reviewer.data();
    const writtenReviews = reviewerInfo.writtenReviews;

    const updatedWrittenReviews = [...writtenReviews, review];

    const updateObject = {
      writtenReviews: updatedWrittenReviews,
    };
    await updateDoc(docRef, updateObject);
  } catch (error) {
    console.log("error in addReviewToRevieww", error);
  }
};

export const addLikedUser = async (currentUserId, likedUserId) => {
  try {
    const docRef = doc(db, "Users", currentUserId);
    const likedUser = await getDoc(db, "Users", currentUserId);
    const likedUserInfo = likedUser.data();
    const likedUsers = likedUserInfo.likedUsers;
    const updatedLikedUsers = [...likedUsers, likedUserId];

    const updatedObj = {
      likedUsers: updatedLikedUsers,
    };

    await updateDoc(docRef, updatedObj);
  } catch (error) {
    console.log("error in addUserLike", error);
  }
};

//helper functions

const filterThroughTags = (pictureBucketArray, preference) => {
  console.log("OOOOOOOOOOOOOOfilterthrough TAGS", pictureBucketArray);
  for (let i = 0; i < pictureBucketArray.length; i++) {
    if (checkTags(pictureBucketArray[i].tags, preference)) {
      return true;
    }
  }
  return false;
};

const checkTags = (arrayOfTags, preference) => {
  console.log("tags", arrayOfTags);
  for (let i = 0; i < arrayOfTags.length; i++) {
    if (arrayOfTags[i] == preference) {
      return true;
    }
  }
  return false;
};

export const filterByPhotoTags = (usersArray, preference) => {
  const filteredList = [];
  console.log("INNNNNNNNNNNNFILTERARRAYPHOTOTAGS", usersArray);
  for (let i = 0; i < usersArray.length; i++) {
    const ithUser = usersArray[i];
    console.log("ithUser", ithUser);
    if (filterThroughTags(ithUser.pictureBucket, preference)) {
      filteredList.push(ithUser);
    }
  }
  return filteredList;
};
