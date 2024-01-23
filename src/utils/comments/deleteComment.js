import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase-config";

export const deleteComments = async (commentId) => {
  let commentRepliesLength = 0;
  const commentDocRef = doc(db, "comments", commentId);
  const CommentReplyDocsQ = query(
    collection(db, "commentReply"),
    where("commentId", "==", commentId)
  );
  const querySnapshot = await getDocs(CommentReplyDocsQ);
  commentRepliesLength = querySnapshot.size;
  querySnapshot.forEach((element) => {
    deleteDoc(element.ref);
  });
  await deleteDoc(commentDocRef);
  return commentRepliesLength;
};
