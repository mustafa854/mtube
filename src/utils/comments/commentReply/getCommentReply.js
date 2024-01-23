import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./../../../config/firebase-config";

export const getCommentReply = async (videoId) => {
  const commentReplyRef = collection(db, "commentReply");
  let output = [];
  const q = query(commentReplyRef, where("videoId", "==", videoId));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((element) => {
    output.push(element.data());
  });
  return output;
};
