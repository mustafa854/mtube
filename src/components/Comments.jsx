import { auth } from "../config/firebase-config";
import CommentsCard from "./CommentsCard";
import { getCommentCounts } from "../utils/comments/getCommentCount";
import { useEffect, useState } from "react";
import { getCurrentVideoComments } from "../utils/comments/getCurrentVideoComments";
import CommentsForm from "./CommentsForm";
import { getCurrentuserCurrentvideoLikes } from "../utils/comments/like/getCurrentuserCurrentvideoLikes";
import { getCommentReply } from "../utils/comments/commentReply/getCommentReply";

function Comments({ id }) {
  const [commentsCount, setCommentsCount] = useState(0);
  const [currentComments, setCurrentComments] = useState([]);
  const [currentUserCommentLikes, setCurrentUserCommentLikes] = useState([]);
  const [message, setMessage] = useState("");
  const [commentReply, setCommentReply] = useState([]);
  const fetchCommentsCountLikesReply = async () => {
    const response = await getCommentCounts(id);
    setCommentsCount(response);
    const commentLikes = await getCurrentuserCurrentvideoLikes(id);
    setCurrentUserCommentLikes(commentLikes);
  };
  const requestLogin = (key) => {
    if (key === "r") {
      setMessage("");
    } else if (key === "a") {
      setMessage("Please Login to post Comment on the video");
    }
  };

  const fetchCurrentVideoCommentsAndReply = async () => {
    const commentsResponse = await getCurrentVideoComments(id);
    setCurrentComments(commentsResponse);
    const commentReplyResponse = await getCommentReply(id);
    setCommentReply(commentReplyResponse);
  };
  useEffect(() => {
    fetchCommentsCountLikesReply();
    fetchCurrentVideoCommentsAndReply();
  }, []);
  useEffect(() => {
    setCommentsCount(0);
    setCurrentComments([]);
    fetchCommentsCountLikesReply();
    fetchCurrentVideoCommentsAndReply();
  }, [id]);
  return (
    <>
      <div className="flex flex-row">
        <h1 className="text-xl font-bold">{commentsCount} Comments</h1>
        {/* <u>sort By</u> */}
      </div>
      <div>
        {message !== "" ? (
          <>
            <div className="flex flex-row">
              <p className="my-auto">{message}</p>
              <button className="my-auto" onClick={() => requestLogin("r")}>
                <svg
                  className="my-auto"
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"
                  />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <p>{message}</p>
        )}
      </div>
      <div className="container flex flex-row mt-5">
        <div className="flex-none">
          <img
            src={
              auth.currentUser?.photoURL === undefined
                ? "/assets/profile.jpeg"
                : auth.currentUser.photoURL
            }
            className="rounded-full"
            alt=""
            style={{ width: "40px", height: "40px" }}
          />
        </div>
        <div className="grow">
          <CommentsForm
            id={id}
            commentsCount={commentsCount}
            setCommentsCount={setCommentsCount}
            setCurrentComments={setCurrentComments}
            message={message}
            setMessage={setMessage}
            requestLogin={requestLogin}
          />
        </div>
      </div>
      <div className="container mt-8">
        {currentComments.map((comment) => {
          return (
            <>
              <CommentsCard
                key={comment.commentId}
                id={id}
                comment={comment}
                currentComments={currentComments}
                setCurrentComments={setCurrentComments}
                currentUserCommentLikes={currentUserCommentLikes}
                setCurrentUserCommentLikes={setCurrentUserCommentLikes}
                commentsCount={commentsCount}
                setCommentsCount={setCommentsCount}
                commentReply={commentReply}
                setCommentReply={setCommentReply}
              />
            </>
          );
        })}
      </div>
    </>
  );
}

export default Comments;
