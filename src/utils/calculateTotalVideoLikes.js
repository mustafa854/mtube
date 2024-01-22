import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../config/firebase-config";
export const calculateTotalVideoLikes = async (videoId) => {
  const qLikes = query(
    collection(db, "Likes"),
    where("VideoId", "==", videoId),
    where("likeOrDislike", "==", "like")
  );
  const querySnapshot = await getDocs(qLikes);
  return querySnapshot.size;
};
