import React, { useRef, useState } from "react";
import "../Css/writeReview.css";
import { auth } from "../db/signup";
import { addReviewToReviewee, addReviewToReviewer } from "../db/users";
import { createReview } from "../db/reviews";
const WriteReview = ({
  children,
  openWriteReview,
  onWriteReviewClose,
  user,
  loggedInUser,
}) => {
  const loggedinId = loggedInUser.id;
  const targetUserId = user.id;
  const reviewRef = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewString = reviewRef.current.value;
    console.log(
      "review text",
      reviewRef.current.value,
      "type",
      typeof reviewRef.current.value
    );
    const reviewId = await createReview(reviewString, loggedinId, targetUserId);
    console.log(
      "review Id created",
      reviewId.id,
      "reviewwee ID",
      loggedinId,
      "targetID",
      targetUserId
    );
    await addReviewToReviewee(targetUserId, reviewId.id);
    await addReviewToReviewer(loggedinId, reviewId.id);
  };

  if (!openWriteReview) return null;

  return (
    <>
      <div className="popup-overlay">
        <div className="add-photo-popup">
          <div className="close-button-review">
            <button onClick={onWriteReviewClose}>X</button>
            {children}
          </div>
          <form onSubmit={submitHandler}>
            <textarea
              id="write-review-textarea"
              rows="10"
              cols="60"
              ref={reviewRef}
              style={{ resize: "none" }}
            ></textarea>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default WriteReview;
