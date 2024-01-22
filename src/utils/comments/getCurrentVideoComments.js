import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase-config";
export const getCurrentVideoComments = async (videoId) => {
  const qComments = query(
    collection(db, "comments"),
    where("videoId", "==", videoId)
  );
  const output = [];
  const querySnapshot = await getDocs(qComments);
  querySnapshot.forEach((doc) => {
    output.push(doc.data());
  });

  return output;
};
