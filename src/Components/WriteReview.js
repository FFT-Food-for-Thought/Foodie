import React, { useRef, useState } from "react";
const WriteReview = ({ userId, revieweeId }) => {
  const [pictags, setTags] = useState([]);
  const reviewRef = useRef();
  const tagRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("review text", reviewRef.current.value);
  };

  const addTagHandler = (e) => {
    console.log(tagRef.current.value);
    if (pictags.includes(tagRef.current.value)) {
      alert("This tag already added");
      return;
    }
    if (pictags.length >= 3) {
      alert("max of three tags");
      return;
    }

    return (
      <>
        <form onSubmit={submitHandler}>
          <textarea ref={reviewRef} style={{ resize: "none" }}></textarea>
          <button>Submit</button>
        </form>
      </>
    );
  };
};
export default WriteReview;
