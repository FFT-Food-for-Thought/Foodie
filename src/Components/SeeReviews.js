import React, { useRef, useState, useEffect } from "react";
import "../Css/seeReviews.css";
import { auth } from "../db/signup";
import { getRevieweeReviews, getReviewerReviews } from "../db/reviews";
const SeeReviews = ({ children, openSeeReview, setSeeReview, user }) => {
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState(0);
  useEffect(() => {
    const _getReviews = async () => {
      console.log("gotreviews");
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
        <div className="popup-overlay-review">
          <div className="see-reviews-popup">
            <div className="signup-close">
              <button
                onClick={() => {
                  setSeeReview(false);
                }}
                className="close-button-review"
              >
                x
              </button>
              {/* {children} */}
            </div>
            <div className="div-reviews">
              <p className="p-reviews p-see-reviews">
                {reviews[currentReview].review}
              </p>
            </div>
            <div className="left-right-reviews">
              <button
                onClick={() => {
                  currentReview > 0 && setCurrentReview(currentReview - 1);
                }}
                className="left-right-button"
              >
                <i class="fa-solid fa-angles-left"></i>
              </button>
              <button
                onClick={() => {
                  currentReview < reviews.length - 1 &&
                    setCurrentReview(currentReview + 1);
                }}
                className="left-right-button"
              >
                <i class="fa-solid fa-angles-right"></i>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="popup-overlay-review">
          <div className="see-reviews-popup">
            <div className="signup-close">
              <button
                onClick={() => {
                  setSeeReview(false);
                }}
                className="close-button-review"
              >
                x
              </button>
            </div>
            <div className="div-reviews">
              <p className="p-reviews">No Reviews</p>
            </div>
          </div>
        </div>
      </>
    );
  }
};
export default SeeReviews;
