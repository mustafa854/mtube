import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../config/firebase-config";

export const updateCommentReply = async (commentId, commentText) => {
  const commentRef = doc(db, "commentReply", commentId);

  await updateDoc(commentRef, {
    commentText: commentText,
  });
  console.log("Comment updated successfully");
};
