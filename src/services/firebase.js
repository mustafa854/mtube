// get all videos here
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./../config/firebase-config";

const q = query(collection(db, "videos"));

export const getVideos = async () => {
  const querySnapshot = await getDocs(q);
  return querySnapshot;
};
