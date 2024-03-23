import { useState } from "react";
import { getCommentCounts } from "../utils/comments/getCommentCount";
import { postComment } from "../utils/comments/postComment";
import { auth } from "../config/firebase-config";

function CommentsForm({
  id,
  commentsCount,
  setCommentsCount,
  setCurrentComments,
  message,
  setMessage,
  requestLogin,
}) {
  const [commentInput, setCommentInput] = useState("");
  const onSubmitForm = async (e) => {
    e.preventDefault();
    const response = await postComment(id, commentInput);
    setCommentsCount(commentsCount + 1);
    setCurrentComments((prevArray) => [...prevArray, response]);
    setCommentInput("");
  };
  if (auth.currentUser) {
    return (
      <>
        <input
          type="text"
          placeholder="Add a comment..."
          className="border-b w-full ml-4 pb-1 font-normal text-black focus:outline-none placeholder:font-normal placeholder:text-black"
          onChange={(e) => setCommentInput(e.target.value)}
          value={commentInput}
        />
        <button
          className="mt-2 ml-4 bg-black hover:bg-slate-900 text-white py-1 text-sm mx-auto px-2 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={onSubmitForm}
        >
          Post Comment
        </button>
      </>
    );
  } else {
    return (
      <>
        <div onClick={() => requestLogin("a")}>
          <input
            type="text"
            placeholder="Add a comment..."
            className="border-b w-full ml-4 pb-1 font-normal text-black focus:outline-none placeholder:font-normal placeholder:text-black"
            onChange={() => requestLogin("a")}
            value={commentInput}
          />
          <button
            className="mt-2 ml-4 bg-black hover:bg-slate-900 text-white py-1 text-sm mx-auto px-2 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            onClick={() => requestLogin("a")}
          >
            Post Comment
          </button>
        </div>
      </>
    );
  }
}

export default CommentsForm;
