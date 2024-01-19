import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db, auth } from "../config/firebase-config";
import { doc, getDoc } from "firebase/firestore";
export const updateLikeorDislike = async (videoId, status) => {
  //   const docRef = doc(db, "userMeta", id);
  //   const docSnap = await getDoc(docRef);
  const user = auth.currentUser;
  const q = query(
    collection(db, "Likes"),
    where("likedBy", "==", user.uid),
    where("VideoId", "==", videoId)
  );
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  if (querySnapshot.size < 1) {
    // Assume we have a Firestore collection reference stored in the variable 'collectionRef'
    const addLikesRef = collection(db, "Likes");

    // Create a new document with a generated ID
    const docRef = await addDoc(addLikesRef, {
      likedBy: user.uid,
      VideoId: videoId,
      likeOrDislike: status,
      // More fields...
    });

    console.log("Document written with ID: ", docRef.id);
  } else {
    querySnapshot.forEach((doc) => {
      if (status === "like") {
        return updateDoc(doc.ref, {
          likeOrDislike: "like",
        });
      } else if (status === "dislike") {
        return updateDoc(doc.ref, {
          likeOrDislike: "dislike",
        });
      } else if (status === "") {
        return deleteDoc(doc.ref);
      }
    });
  }
};
