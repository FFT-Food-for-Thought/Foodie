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
  GeoPoint,
} from "firebase/firestore";
import { auth } from "./signup";

const userRef = collection(db, "Users");

export const getAllUsers = async () => {
  try {
    const users = await getDocs(userRef);
    let allUser = users.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    console.log("allUser :>> ", allUser);
    return allUser;
  } catch (error) {
    console.log("error getting all users", error);
  }
};

export const getAllChefs = async () => {
  try {
    const q = query(userRef, where("role", "==", "chef"));

    const allChefSnapshots = await getDocs(q);
    const allChefs = allChefSnapshots.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    console.log("in get all chefs", allChefs);
    return allChefs;
  } catch (error) {
    console.log("error in getting all chefs", error);
  }
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
  location,
  bio,
  preference
) => {
  // Below is old hardcoded code
  // const docRef = doc(db, "Users", "fhfUllMNrJD0ddRgT38Z");
  // const update = { firstName: "Peter" };
  // await updateDoc(docRef, update);
  try {
    const docRef = doc(db, "Users", userId);
    const update = {
      firstName: firstName,
      lastName: lastName,
      location: location,
      username: userName,
      email: email,
      bio: bio,
      preference: preference,
    };
    console.log("update :>> ", update);
    await updateDoc(docRef, update);
  } catch (error) {
    console.log("error in updateUser", error);
  }
};

//Test get all info of a user based on uid?
export const getLoggedUser = async () => {
  try {
    const uid = auth.currentUser.uid;
    const userCol = collection(db, "Users");
    const q = query(userCol, where("userId", "==", uid));
    const snapshot = await getDocs(q);
    const userArray = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    console.log("getloggedinuser array [0]", userArray[0]);
    return userArray[0];
  } catch (error) {
    console.log("error in getloggeduser", error);
  }
};

export const makeUser = async (
  uid,
  email,
  lastName,
  firstName,
  username,
  location
) => {
  try {
    const newUserObj = {
      userId: uid,
      bio: "",
      email,
      lastName,
      firstName,
      username,
      location,
      pictureBucket: [],
      likedUsers: [],
      reviews: [],
      writtenReviews: [],
      role: "foodie",
      preference: "None",
    };
    await addDoc(userRef, newUserObj);
  } catch (error) {
    console.log("error in makeUser", error);
  }
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

export const addGeo = async (userId, lat, long) => {
  try {
    const docRef = doc(db, "Users", userId);
    const update = { geo: new GeoPoint(lat, long) };
    await updateDoc(docRef, update);
  } catch (error) {
    // console.log("error in try catch AddGeo :>> ", error);
  }
};
