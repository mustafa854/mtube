import { useEffect, useState } from "react";
import { auth } from "../config/firebase-config";
import { deleteCommentReply } from "../utils/comments/commentReply/deleteCommentReply";
import { updateCommentReply } from "../utils/comments/commentReply/updateCommentReply";
import CommentReplyForm from "./CommentReplyForm";

function CommentReply({
  comment,
  setCurrentCommentReply,
  setCommentReply,
  commentsCount,
  setCommentsCount,
}) {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [datePublished, setDatePublished] = useState("");
  const [commentInput, setCommentInput] = useState(comment.commentText);
  const [commentReplyFormVisible, setCommentReplyFormVisible] = useState(false);
  useEffect(() => {
    const date = new Date(comment.datePublished.seconds * 1000);

    if (
      isNaN(date.getDate()) ||
      isNaN(date.getMonth()) ||
      isNaN(date.getFullYear())
    ) {
      setDatePublished("Just Now");
    } else {
      setDatePublished(
        String(date.getDate()) +
          "/" +
          String(date.getMonth() + 1) +
          "/" +
          String(date.getFullYear())
      );
    }
  }, []);

  const onUpdateComment = async () => {
    await updateCommentReply(comment.replyId, commentInput);
    setIsReadOnly(true);

    setCurrentCommentReply((prevArray) =>
      prevArray.map((prevComment) =>
        prevComment.replyId === comment.replyId
          ? { ...prevComment, commentText: commentInput }
          : prevComment
      )
    );
    setCommentReply((prevArray) =>
      prevArray.map((prevComment) =>
        prevComment.replyId === comment.replyId
          ? { ...prevComment, commentText: commentInput }
          : prevComment
      )
    );
  };
  const onClickDeleteCommentReply = async () => {
    await deleteCommentReply(comment.replyId);

    setCurrentCommentReply((prevArray) =>
      prevArray.filter((element) => element.replyId !== comment.replyId)
    );
    setCommentReply((prevArray) =>
      prevArray.filter((element) => element.replyId !== comment.replyId)
    );
    setCommentsCount(commentsCount - 1);
  };

  return (
    <>
      <div className="container flex flex-row mt-5">
        <div className="flex-none">
          <img
            src={comment.userImage}
            className="rounded-full"
            alt=""
            style={{ width: "40px", height: "40px" }}
          />
        </div>
        <div className="pl-4 grow">
          <div className="container flex flex-row my-auto">
            <p className="text-sm text-black font-medium my-auto">
              {comment.commentUserName}
            </p>
            <p
              className="mt-auto text-xs ml-2"
              style={{
                color: "#606060",
                marginBottom: "1px",
              }}
            >
              {datePublished}
            </p>
          </div>
          <div className="container mt-1">
            <span className="text-sky-600">@{comment.toReplyUserName}</span>
            <textarea
              readOnly={isReadOnly}
              value={comment.commentText}
              onChange={(e) => setCommentInput(e.target.value)}
              className="focus:outline-none text-black w-full"
              rows={1}
              style={{
                fontSize: "14px",
                marginTop: "2px",
                display: "block",
                // overflow: "hidden",
                resize: "block",
              }}
            ></textarea>

            {/* <p
              className="text-black"
              style={{ fontSize: "14px", marginTop: "2px" }}
            >
              {comment.commentText}
            </p> */}
          </div>
          <div className="contianer flex flex-row justify-start items-start gap-4 mt-3">
            <div className=" flex flex-row gap-2">
              <div
                className="my-auto cursor-pointer"
                onClick={() => buttonClicked("like")}
              >
                {/* {currentUserLike?.likeOrDislike !== "like" ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#000000"
                      d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2M4 10h2v9H4zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7z"
                    />
                  </svg>
                ) : (
                  <svg
                    className=""
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2M20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2"
                    />
                  </svg>
                )} */}
              </div>
              {/* <div>{currentCommentLikesCount}</div> */}
            </div>
            <div
              className=" my-auto cursor-pointer"
              //   onClick={() => buttonClicked("dislike")}
            >
              {/* {currentUserLike?.likeOrDislike !== "dislike" ? (
                <svg
                  className="rotate-180"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#000000"
                    d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2M4 10h2v9H4zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7z"
                  />
                </svg>
              ) : (
                <svg
                  className="rotate-180"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2M20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2"
                  />
                </svg>
              )} */}
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setCommentReplyFormVisible(true)}
            >
              Reply
            </div>
            {auth.currentUser?.uid === comment.uid ? (
              <div className="flex flex-row gap-4">
                <div className="">
                  {isReadOnly ? (
                    <button onClick={() => setIsReadOnly(false)}>Edit</button>
                  ) : (
                    <button onClick={onUpdateComment}>Save</button>
                  )}
                </div>
                <div>
                  {<button onClick={onClickDeleteCommentReply}>Delete</button>}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div>
            {commentReplyFormVisible ? (
              <div className="ml-0 my-4">
                <CommentReplyForm
                  setCommentReplyFormVisible={setCommentReplyFormVisible}
                  commentId={comment.commentId}
                  toReplyUserName={comment.commentUserName}
                  videoId={comment.videoId}
                  commentsCount={commentsCount}
                  setCommentsCount={setCommentsCount}
                  setCurrentCommentReply={setCurrentCommentReply}
                  setCommentReply={setCommentReply}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default CommentReply;
