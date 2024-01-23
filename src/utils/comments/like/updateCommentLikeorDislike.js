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
  videoId,
  type
) => {
  if (type == "comment") {
    const user = auth.currentUser;
    if (user) {
      if (commentLikesId && commentLikesId !== "") {
        const likesRef = doc(db, "commentLikes", commentLikesId);

        if (likeOrDislike !== "") {
          await updateDoc(likesRef, {
            likeOrDislike: likeOrDislike,
          });

          return commentLikesId;
        } else {
          await deleteDoc(likesRef);
          return {};
        }
      } else {
        const likesRefCollection = collection(db, "commentLikes");
        const docRef = await addDoc(likesRefCollection, {
          commentId: commentId,
          likeOrDislike: likeOrDislike,
          uid: auth.currentUser.uid,
          videoId: videoId,
          objectType: "comment",
        });

        // Now docRef.id is defined
        await setDoc(
          doc(likesRefCollection, docRef.id),
          {
            commentLikesId: docRef.id,
          },
          { merge: true }
        );
        return docRef.id;
      }
    }
  } else if (type == "video") {
    const user = auth.currentUser;
    if (user) {
      if (commentLikesId && commentLikesId !== "") {
        const likesRef = doc(db, "commentLikes", commentLikesId);

        if (likeOrDislike !== "") {
          await updateDoc(likesRef, {
            likeOrDislike: likeOrDislike,
          });

          return {
            commentId: commentId,
            commentLikesId: commentLikesId,
            likeOrDislike: likeOrDislike,
            uid: auth.currentUser.uid,
            videoId: videoId,
          };
        } else {
          await deleteDoc(likesRef);
          return {};
        }
      } else {
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
  }
};
