import React, { useRef, useState } from "react";
import "../Css/writeReview.css";
const WriteReview = ({
  userId,
  revieweeId,
  children,
  openWriteReview,
  onWriteReviewClose,
}) => {
  const [pictags, setTags] = useState([]);
  const reviewRef = useRef();
  const tagRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("review text", reviewRef.current.value);
  };

  if (!openWriteReview) return null;

  return (
    <>
      <div className="popup-overlay">
        <div className="add-photo-close">
          <div className="close-button-review">
            <button onClick={onWriteReviewClose}>X</button>
            {children}
          </div>
          <form onSubmit={submitHandler}>
            <textarea ref={reviewRef} style={{ resize: "none" }}></textarea>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default WriteReview;
