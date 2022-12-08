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
  where,
  query,
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
export const createReview = async (reviewString, reviewerId, revieweeId) => {
  try {
    const review = {
      review: reviewString,
      createdAt: serverTimestamp(),
      reviewerId,
      revieweeId,
    };
    const reviewId = await addDoc(reviewRef, review);
    return reviewId;
  } catch (error) {
    console.log("error in createReview", error);
  }
};

// test function with hardcoded review
export const updateReview = async () => {
  try {
    const reviewRef = doc(db, "Reviews", "hjpevG87iwfoZzEr2Mtd");
    const update = {
      review: "This was actually not that bad.",
      lastUpdateAt: serverTimestamp(),
    };
    await updateDoc(reviewRef, update);
  } catch (error) {
    console.log("error in updateReview", error);
  }
};
export const getReviews = async () => {
  try {
    const reviews = await getDocs(reviewRef);
    let review = reviews.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    console.log("review :>> ", review);
    return review;
  } catch (error) {
    console.log("erorr in getReviews");
  }
};

export const getReview = async () => {
  try {
    const reviewRef = doc(db, "Reviews", "hjpevG87iwfoZzEr2Mtd");
    const review = await getDoc(reviewRef);
    console.log("review :>> ", review.data());
  } catch (error) {
    console.log("error in get Review", error);
  }
};

export const getRevieweeReviews = async (revieweeId) => {
  try {
    const reviewCol = collection(db, "Reviews");
    const q = query(reviewCol, where("revieweeId", "==", revieweeId));
    const reviewSnapshot = await getDocs(q);
    const revieweeReviews = reviewSnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return revieweeReviews;
  } catch (error) {
    console.log("error in getRevieweeReviews", error);
  }
};

export const getReviewerReviews = async (reviewerId) => {
  try {
    const reviewCol = collection(db, "Reviews");
    const q = query(reviewCol, where("reviewerId", "==", reviewerId));
    const reviewSnapshot = await getDocs(q);
    const reviewerReviews = reviewSnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return reviewerReviews;
  } catch (error) {
    console.log("error in getReviewerReviews", error);
  }
};

export const deleteReview = async () => {
  await deleteDoc(doc(db, "Reviews", "hjpevG87iwfoZzEr2Mtd"));
};
