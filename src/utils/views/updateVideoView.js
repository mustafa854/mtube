import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase-config";

export const updateVideoView = async (videoId) => {
  const videoDoc = doc(db, "videos", videoId);
  const docSnap = await getDoc(videoDoc);
  const newViews = docSnap.data().views + 1;
  console.log(newViews);
  await updateDoc(videoDoc, {
    views: newViews,
  });
  return newViews;
};
