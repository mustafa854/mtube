import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../../config/firebase-config";

export const updateCommentLikeorDislike = async (
  commentId,
  commentLikesId,
  likeOrDislike,
  videoId
) => {
  const user = auth.currentUser;
  console.log("basjkdbnaskdjnaskdasdkjnasidn bhg bc", commentLikesId);
  if (user) {
    if (commentLikesId && commentLikesId !== "") {
      const likesRef = doc(db, "commentLikes", commentLikesId);

      if (likeOrDislike !== "") {
        await updateDoc(likesRef, {
          likeOrDislike: likeOrDislike,
        });

        console.log("Like updated successfully");
        return {
          commentId: commentId,
          commentLikesId: commentLikesId,
          likeOrDislike: likeOrDislike,
          uid: auth.currentUser.uid,
          videoId: videoId,
        };
      } else {
        console.log("Deleting document:", likesRef);
        await deleteDoc(likesRef);
        console.log("Document deleted successfully:", likesRef);
        return {};
      }
      console.log("Like updated successfully");
    } else {
      console.log("yaha kyu aa raha hai bhenchod");
      const likesRefCollection = collection(db, "commentLikes");
      const docRef = await addDoc(likesRefCollection, {
        commentId: commentId,
        likeOrDislike: likeOrDislike,
        uid: auth.currentUser.uid,
        videoId: videoId,
      });

      // Now docRef.id is defined
      await setDoc(
        doc(likesRefCollection, docRef.id),
        {
          commentLikesId: docRef.id,
        },
        { merge: true }
      );
      return {
        commentId: commentId,
        commentLikesId: docRef.id,
        likeOrDislike: likeOrDislike,
        uid: auth.currentUser.uid,
        videoId: videoId,
      };
    }
  }
};
