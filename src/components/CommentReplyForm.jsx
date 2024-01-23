import { useState } from "react";
import { getCommentCounts } from "../utils/comments/getCommentCount";
import { postComment } from "../utils/comments/postComment";
import { auth } from "../config/firebase-config";
import { postCommentReply } from "../utils/comments/commentReply/postCommentReply";

function CommentReplyForm({
  commentId,
  toReplyUserName,
  videoId,
  setCommentReplyFormVisible,
  commentsCount,
  setCommentsCount,
  setCurrentCommentReply,
  setCommentReply,
}) {
  const [commentInput, setCommentInput] = useState("");
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const response = await postCommentReply(
      commentId,
      commentInput,
      toReplyUserName,
      videoId
    );
    setCommentsCount(commentsCount + 1);
    setCurrentCommentReply((prevArray) => [...prevArray, response]);

    setCommentReply((prevArray) => [...prevArray, response]);

    setCommentInput("");
    setCommentReplyFormVisible(false);
  };
  if (auth.currentUser) {
    return (
      <>
        <div className="container flex flex-row">
          <div className="container" style={{ width: "50px" }}>
            <img
              src={auth.currentUser.photoURL}
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "500px",
                objectFit: "cover",
              }}
              alt=""
            />
          </div>
          <div className="container ml-2">
            <input
              type="text"
              placeholder="Add a comment..."
              className="border-b w-full  pb-1 font-normal text-black focus:outline-none placeholder:font-normal placeholder:text-black"
              onChange={(e) => setCommentInput(e.target.value)}
              value={commentInput}
            />
            <button
              className="mt-2  bg-black hover:bg-slate-900 text-white py-1 text-sm mx-auto px-2 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={onSubmitForm}
            >
              Reply
            </button>
            <button
              className="mt-2 ml-2  bg-black hover:bg-slate-900 text-white py-1 text-sm mx-auto px-2 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={() => setCommentReplyFormVisible(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default CommentReplyForm;
