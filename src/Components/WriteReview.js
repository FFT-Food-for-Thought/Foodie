import React, { useRef } from "react";

const WriteReview = ({ userId, revieweeId }) => {
  const reviewRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("review text", reviewRef.current.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <textarea ref={reviewRef} style={{ resize: "none" }}></textarea>
      <button>Submit</button>
    </form>
  );
};

export default WriteReview;
