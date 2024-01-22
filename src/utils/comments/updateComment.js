import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";

export const updateComment = async (commentId, commentText) => {
  const commentRef = doc(db, "comments", commentId);

  await updateDoc(commentRef, {
    commentText: commentText,
  });
  console.log("Comment updated successfully");
};
