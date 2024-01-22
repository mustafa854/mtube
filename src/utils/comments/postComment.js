import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  Timestamp,
  serverTimestamp,
  addDoc,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase-config";
export const postComment = async (videoId, commentText) => {
  const user = auth.currentUser;
  if (user) {
    const commentsRef = doc(collection(db, "comments"));
    await setDoc(commentsRef, {
      commentId: commentsRef.id,
      commentText: commentText,
      commentUserName: user.displayName,
      datePublished: serverTimestamp(),
      uid: user.uid,
      userImage: user.photoURL,
      videoId: videoId,
    });
    return {
      commentId: commentsRef.id,
      commentText: commentText,
      commentUserName: user.displayName,
      datePublished: serverTimestamp(),
      uid: user.uid,
      userImage: user.photoURL,
      videoId: videoId,
    };
  }
};
