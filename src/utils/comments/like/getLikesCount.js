import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase-config";

export const getLikesCount = async (commentId) => {
  const commentLikesRef = collection(db, "commentLikes");
  const q = query(
    commentLikesRef,
    where("commentId", "==", commentId),
    where("likeOrDislike", "==", "like")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.size;
};
