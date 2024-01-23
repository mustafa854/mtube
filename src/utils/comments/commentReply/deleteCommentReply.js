import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase-config";

export const deleteCommentReply = async (replyId) => {
  const commentReplyRef = doc(db, "commentReply", replyId);
  await deleteDoc(commentReplyRef);
  console.log("reply deleted!");
};
