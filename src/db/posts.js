import db from "./firebase";
import {
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

//get all posts
export const getAllPosts = async () => {
  const allPostRef = collection(db, "Posts");
  const snapshot = await getDocs(allPostRef);
  const posts = snapshot.docs.map((post) => {
    return { ...post.data(), id: post.id };
  });
  console.log(posts);
};

export const getPost = async () => {
  const postRef = doc(db, "Posts", "SnfGhpSnmoapaB1q8SfL");
  const post = await (await getDoc(postRef)).data();
  console.log(post);
};

//Adding a post
export const createPost = async () => {
  const postRef = collection(db, "Posts");
  const post = {
    post: "this is a hard coded test add post",
    createdAt: serverTimestamp(),
  };
  await addDoc(postRef, post);
};

//updating posts
export const updatePost = async () => {
  const postRef = doc(db, "Posts", "cCC4dvSiYvYdJaaVubrZ");
  const updatedPost = {
    post: "this is an updated hard coded test update post",
    lastUpdatedAt: serverTimestamp(),
  };
  await updateDoc(postRef, updatedPost);
};

//delete posts
export const deletePost = async () => {
  const postRef = doc(db, "Posts", "eaSWhe5AhcbC2cmU9KE8");
  await deleteDoc(postRef);
};
