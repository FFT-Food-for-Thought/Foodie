import React, { useRef, useState, useEffect } from "react";
import "../Css/seeReviews.css";
import { auth } from "../db/signup";
import { getRevieweeReviews, getReviewerReviews } from "../db/reviews";
const SeeReviews = ({ children, openSeeReview, setSeeReview, user }) => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const _getReviews = async () => {
      const gottenReviews = await getRevieweeReviews(user.id);
      setReviews(gottenReviews);
    };
    _getReviews();
  }, [user.reviews.length]);

  const submitHandler = async (e) => {};
  console.log("rendered seereviews", reviews);
  if (!openSeeReview) return null;

  return (
    <>
      <div className="popup-overlay">
        <div className="add-photo-popup">
          <div className="close-button-review">
            <button
              onClick={() => {
                setSeeReview(false);
              }}
            >
              X
            </button>
            {/* {children} */}
            <div>
              {reviews.map((review) => {
                return <p>{review.review}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SeeReviews;
