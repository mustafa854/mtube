import {
  addDoc,
  collection,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../../config/firebase-config";

export const postCommentReply = async (
  commentId,
  commentText,
  toReplyUserName,
  videoId
) => {
  let user = auth.currentUser;
  if (user) {
    try {
      // Step 1: Create a new document without specifying an ID
      const docRef = await addDoc(collection(db, "commentReply"), {
        commentId,
        commentText,
        toReplyUserName,
        videoId,
        commentUserName: user.displayName,
        datePublished: serverTimestamp(),

        uid: user.uid,
        userImage: user.photoURL,
      });

      // Step 2: Update the document with the ID as a field
      await setDoc(
        docRef,
        {
          replyId: docRef.id,
        },
        { merge: true }
      );
      console.log("Document written with ID: ", docRef.id);

      return {
        replyId: docRef.id,
        commentId,
        commentText,
        toReplyUserName,
        videoId,
        commentUserName: user.displayName,
        datePublished: serverTimestamp(),
        uid: user.uid,
        userImage: user.photoURL,
      };
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
};
