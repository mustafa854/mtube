import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase-config";
export const getCommentCounts = async (videoId) => {
  const qComments = query(
    collection(db, "comments"),
    where("videoId", "==", videoId)
  );
  const querySnapshot = await getDocs(qComments);
  const qCommetsReply = query(
    collection(db, "commentReply"),
    where("videoId", "==", videoId)
  );
  const querySnapshot2 = await getDocs(qCommetsReply);

  return querySnapshot.size + querySnapshot2.size;
};
