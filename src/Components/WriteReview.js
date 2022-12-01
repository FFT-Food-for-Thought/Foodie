import React, { useRef, useState } from "react";
import { tags } from "../db/tags";
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
    const newTags = [...pictags, tagRef.current.value];
    setTags(newTags);
  };
  const onTagHandler = (e) => {
    e.preventDefault();
    console.log(e.target.dataset.tag);
    const deleteTag = e.target.dataset.tag;
    const newTags = pictags.filter((tag) => {
      if (tag !== deleteTag) {
        return tag;
      }
    });
    setTags(newTags);
  };

  const handleAddPic = (e) => {
    e.preventDefault();
    console.log(`adding these tags ${pictags}`);
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <textarea ref={reviewRef} style={{ resize: "none" }}></textarea>
        <button>Submit</button>
      </form>
      <select ref={tagRef} name="tags" id="picturetags">
        {tags.map((tag) => {
          return (
            <option key={tag} value={tag}>
              {tag}
            </option>
          );
        })}
      </select>
      <button onClick={addTagHandler}>AddTag</button>
      <div>
        {pictags.map((tag, i) => {
          return (
            <div key={i}>
              <button onClick={onTagHandler} data-tag={tag}>
                X
              </button>
              <p>{tag}</p>
            </div>
          );
        })}
      </div>
      <button onClick={handleAddPic}>Add photo</button>
    </>
  );
};

export default WriteReview;
