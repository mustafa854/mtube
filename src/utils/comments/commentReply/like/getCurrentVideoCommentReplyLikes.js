import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../../config/firebase-config";

export const getCurrentVideoCommentReplyLikes = async (videoId) => {
  const allVideoLikes = [];

  const commentReplyLikesRef = collection(db, "commentLikes");
  const q = query(
    commentReplyLikesRef,
    where("videoId", "==", videoId),
    where("objectType", "==", "comment")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((element) => {
    allVideoLikes.push(element.data());
  });

  return allVideoLikes;
};

export const getCurrentCommentReplyLikesandDislikes = (
  array,

  commentId
) => {
  const allVideoLikes = array;
  const likesAndDislikes = allVideoLikes.filter(
    (element) => element.commentId === commentId
  );
  console.log(likesAndDislikes);
  return likesAndDislikes;
};

export const getCurrentCommentReplyLikesandDislikesCount = (
  array,
  commentId
) => {
  const allVideoLikes = array;
  //   console.log("allVideoLikes", allVideoLikes);

  if (!Array.isArray(allVideoLikes)) {
    return 0;
  }

  const likesAndDislikes = allVideoLikes.filter((element) => {
    // console.log("element.commentId", element.commentId, commentId);
    return element.likeOrDislike === "like" && element.commentId === commentId;
  });
  //   console.log(likesAndDislikes.length);
  return likesAndDislikes.length;
};

export const getCurrentUserLikesandDislikes = async (array, commentId) => {
  const allVideoLikes = array;

  if (!Array.isArray(allVideoLikes)) {
    return 0;
  }

  const likesAndDislikes = allVideoLikes.filter((element) => {
    return (
      element.uid === auth.currentUser.uid && element.commentId === commentId
    );
  });

  return likesAndDislikes[0];
};
