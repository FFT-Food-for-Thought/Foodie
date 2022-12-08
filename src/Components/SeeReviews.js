import React, { useRef, useState, useEffect } from "react";
import "../Css/seeReviews.css";
import { auth } from "../db/signup";
import { getRevieweeReviews, getReviewerReviews } from "../db/reviews";
const SeeReviews = ({ children, openSeeReview, setSeeReview, user }) => {
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState(0);
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

  if (reviews.length) {
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
              <div>{reviews[currentReview].review}</div>
              <button
                onClick={() => {
                  currentReview > 0 && setCurrentReview(currentReview - 1);
                }}
              >
                {"<<"}
              </button>
              <button
                onClick={() => {
                  currentReview < reviews.length - 1 &&
                    setCurrentReview(currentReview + 1);
                }}
              >
                {">>"}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else
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
              <div>No reviews yet</div>
            </div>
          </div>
        </div>
      </>
    );
};
export default SeeReviews;
