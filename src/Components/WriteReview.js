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

    user.reviews.push({
      review: reviewString,
    });
  };

  if (!openWriteReview) return null;

  return (
    <>
      <div className="popup-overlay-write-review">
        <div className="write-review-popup">
          <div className="signup-close">
            <button
              onClick={onWriteReviewClose}
              className="close-button-review"
            >
              x
            </button>
            {children}
          </div>
          <form
            onSubmit={submitHandler}
            className="form-container-write-review"
          >
            <textarea
              id="write-review-textarea"
              rows="10"
              cols="60"
              ref={reviewRef}
              style={{ resize: "none" }}
            ></textarea>
            <button className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default WriteReview;
