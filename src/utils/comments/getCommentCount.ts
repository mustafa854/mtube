import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase-config";
export const getCommentCounts = async (videoId) => {
  const qComments = query(
    collection(db, "comments"),
    where("videoId", "==", videoId)
  );
  const querySnapshot = await getDocs(qComments);

  return querySnapshot.size;
};
