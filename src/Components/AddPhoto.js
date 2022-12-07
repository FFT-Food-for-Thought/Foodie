import React, { useState, useRef } from "react";
import "../Css/addphoto.css";
import { storage } from "../db/firebase";
import { auth } from "../db/signup";
import { uuidv4 as v4 } from "@firebase/util";
import { tags } from "../db/tags";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addPicture } from "../db/pictures";

const AddPhoto = ({ openAddPhoto, children, onAddPhotoClose }) => {
  const [imageUpload, setImageUpload] = useState(null);
  const [pictags, setTags] = useState([]);
  const tagRef = useRef();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    if (imageUpload == null) return;

    const imageName = `${imageUpload.name}` + v4();
    const imageRef = ref(storage, `${uid}/${imageName}`);

    // uploadBytes(imageRef, imageUpload).then(() => {
    //   alert("image uploaded");
    // });
    await uploadBytes(imageRef, imageUpload);
    alert("image uploaded");
    console.log("right before get URL");
    const URL = await getDownloadURL(imageRef);
    console.log(URL);
    await addPicture(URL, imageName, pictags);
  };
  const handleImageChange = async (e) => {
    e.preventDefault();
    setImageUpload(e.target.files[0]);
  };

  if (!openAddPhoto) return null;

  return (
    <>
      <div className="popup-overlay">
        <div className="add-photo-popup">
          <div className="add-photo-close">
            <div className="add-photo-form-container">
              <div className="close-button">
                <button onClick={onAddPhotoClose}>X</button>
                {children}
              </div>
              <input
                type="file"
                onChange={handleImageChange}
                placeholder="Add Photo"
                id="addphotoChooserthingy"
                className="add-photo-input"
              />

              <select ref={tagRef} name="tags" id="picturetags">
                {tags.map((tag) => {
                  return (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  );
                })}
              </select>
              <div>
                <button onClick={addTagHandler}>AddTag</button>
                <button onClick={handleSubmit} className="addphoto-submit">
                  Submit
                </button>
              </div>
            </div>
            <div>
              {pictags.map((tag, i) => {
                return (
                  <div key={i} className="tags-and-delete">
                    <div className="">
                      <p className="added-tag">{tag}</p>
                    </div>
                    <div>
                      <button
                        onClick={onTagHandler}
                        data-tag={tag}
                        className="delete-tag"
                      >
                        X
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPhoto;
