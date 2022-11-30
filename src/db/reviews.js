import db from "./firebase";
import {
  addDoc,
  deleteDoc,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  getDocs,
} from "firebase/firestore";

const reviewRef = collection(db, "Reviews");

// test function with hardcoded review
// export const createReview = async () => {
//   const review = {
//     review:
//       "This was the worst meal I ever ate. Peter didn't wash a single dish",
//     createdAt: serverTimestamp(),
//   };
//   await addDoc(reviewRef, review);
// };

//Live function to actually post reviews to review table
export const createReview = async (reviewString, reviewer, reviewee) => {
  const review = {
    review: reviewString,
    createdAt: serverTimestamp(),
    reviewer,
    reviewee,
  };
  await addDoc(reviewRef, review);
};

// test function with hardcoded review
export const updateReview = async () => {
  const reviewRef = doc(db, "Reviews", "hjpevG87iwfoZzEr2Mtd");
  const update = {
    review: "This was actually not that bad.",
    lastUpdateAt: serverTimestamp(),
  };
  await updateDoc(reviewRef, update);
};

export const getReviews = async () => {
  const reviews = await getDocs(reviewRef);
  let review = reviews.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  console.log("review :>> ", review);
};

export const getReview = async () => {
  const reviewRef = doc(db, "Reviews", "hjpevG87iwfoZzEr2Mtd");
  const review = await getDoc(reviewRef);
  console.log("review :>> ", review.data());
};

export const deleteReview = async () => {
  await deleteDoc(doc(db, "Reviews", "hjpevG87iwfoZzEr2Mtd"));
};
