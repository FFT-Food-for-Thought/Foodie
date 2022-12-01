import db from "./firebase";
import { getDocs, collection } from "firebase/firestore";

const tagRef = collection(db, "Tags");

export const tags = ["vegetarian", "seafood", "meatlover", "healthy", "vegen"];

//GETs All Tags
export const getAllTags = async () => {
  const tags = await getDocs(tagRef);
  let tag = tags.docs.map((tag) => {
    return { ...tag.data(), id: tag.id };
  });
  console.log("tag :>> ", tag);
};
