import db from "./firebase";
import { getDocs, collection } from "firebase/firestore";

const tagRef = collection(db, "Tags");

export const tags = [
  "Vegetarian",
  "Seafood",
  "Meatlover",
  "Gluten-Free",
  "Vegan",
  "Keto",
];

export const preference = [
  "Vegetarian",
  "Seafood",
  "Meatlover",
  "Gluten-Free",
  "Vegan",
  "Keto",
  "None",
];

//GETs All Tags
export const getAllTags = async () => {
  const tags = await getDocs(tagRef);
  let tag = tags.docs.map((tag) => {
    return { ...tag.data(), id: tag.id };
  });
  console.log("tag :>> ", tag);
};
