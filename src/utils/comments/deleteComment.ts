import { deleteDoc, doc, documentId } from "firebase/firestore";
import { db } from "../../config/firebase-config";

export const deleteComments = async (commentId) => {
  const commentDocRef = doc(db, "comments", commentId);
  await deleteDoc(commentDocRef);
};
