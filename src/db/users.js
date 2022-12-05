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
  arrayUnion,
  arrayRemove,
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
export const updateUser = async (
  userId,
  email,
  firstName,
  lastName,
  userName,
  location
) => {
  // Below is old hardcoded code
  // const docRef = doc(db, "Users", "fhfUllMNrJD0ddRgT38Z");
  // const update = { firstName: "Peter" };
  // await updateDoc(docRef, update);

  const docRef = doc(db, "Users", userId);
  const update = {
    firstName: firstName,
    lastName: lastName,
    location: location,
    username: userName,
    email: email,
  };
  console.log("update :>> ", update);
  await updateDoc(docRef, update);
};

//Test get all info of a user based on uid?
export const getLoggedUser = async () => {
  const uid = auth.currentUser.uid;
  const userCol = collection(db, "Users");
  const q = query(userCol, where("userId", "==", uid));
  const snapshot = await getDocs(q);
  const userArray = snapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  console.log("getloggedinuser array [0]", userArray[0]);
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

export const addReviewToReviewee = async (revieweeId, reviewId) => {
  try {
    const docRef = doc(db, "Users", revieweeId);

    // const reviewee = await getDoc(db, "Users", revieweeId);
    // const revieweeInfo = reviewee.data();
    // const reviews = revieweeInfo.reviews;

    // const updatedReviews = [...reviews, review];

    const updateObject = {
      reviews: arrayUnion(reviewId),
    };
    await updateDoc(docRef, updateObject);
  } catch (error) {
    console.log("error in addReviewToRevieww", error);
  }
};

export const addReviewToReviewer = async (reviewerId, reviewId) => {
  try {
    const docRef = doc(db, "Users", reviewerId);
    // const reviewer = await getDoc(db, "Users", reviewerId);
    // const reviewerInfo = reviewer.data();
    // const writtenReviews = reviewerInfo.writtenReviews;

    // const updatedWrittenReviews = [...writtenReviews, review];

    const updateObject = {
      writtenReviews: arrayUnion(reviewId),
    };
    await updateDoc(docRef, updateObject);
  } catch (error) {
    console.log("error in addReviewToRevieww", error);
  }
};

export const addLikedUser = async (currentUserId, likedUserId, likedName) => {
  try {
    const docRef = doc(db, "Users", currentUserId);
    // const likedUser = await getDoc(db, "Users", currentUserId);
    // const likedUserInfo = likedUser.data();
    // const likedUsers = likedUserInfo.likedUsers;
    // const updatedLikedUsers = [...likedUsers, likedUserId];
    const likedObj = {
      name: likedName,
      userId: likedUserId,
    };

    console.log("likedObj in like function", likedObj);
    const updatedObj = {
      likedUsers: arrayUnion(likedObj),
    };

    console.log(updatedObj);
    await updateDoc(docRef, updatedObj);
  } catch (error) {
    console.log("error in addUserLike", error);
  }
};

export const removeLike = async (currentUserId, likedUserObj) => {
  try {
    const userRef = doc(db, "Users", currentUserId);
    const updatedObj = {
      likedUsers: arrayRemove(likedUserObj),
    };
    await updateDoc(userRef, updatedObj);
  } catch (error) {}
};
//helper functions

const filterThroughTags = (pictureBucketArray, preference) => {
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
  for (let i = 0; i < usersArray.length; i++) {
    const ithUser = usersArray[i];
    if (filterThroughTags(ithUser.pictureBucket, preference)) {
      filteredList.push(ithUser);
    }
  }
  return filteredList;
};

//distance formula, returned in miles
export function distance(lat1, lon1, lat2, lon2) {
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  let r = 3956;

  return c * r;
}
