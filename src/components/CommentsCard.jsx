import { useEffect, useState } from "react";
import { auth } from "../config/firebase-config";
import { updateComment } from "../utils/comments/updateComment";
import { updateCommentLikeorDislike } from "../utils/comments/like/updateCommentLikeorDislike";
import { getCurrentuserCurrentvideoLikes } from "../utils/comments/like/getCurrentuserCurrentvideoLikes";
import { getLikesCount } from "../utils/comments/like/getLikesCount";
import { deleteComments } from "../utils/comments/deleteComment";

function CommentsCard({
  id,
  comment,
  currentComments,
  setCurrentComments,
  currentUserCommentLikes,
  setCurrentUserCommentLikes,
  commentsCount,
  setCommentsCount,
}) {
  const deleteComment = async () => {
    await deleteComments(comment.commentId);
    setCommentsCount(commentsCount - 1);
    setCurrentComments(
      currentComments.filter(
        (element) => element.commentId !== comment.commentId
      )
    );
  };

  const [loading, setLoading] = useState(true);
  const [currentUserLike, setCurrentUserLike] = useState({
    commentId: comment.commentId,
    likeOrDislike: "",
    uid: auth.currentUser?.uid,
    videoId: id,
    commentLikesId: undefined,
  });
  const [message, setMessage] = useState("");
  const [currentCommentLikesCount, setCurrentCommentLikesCount] = useState(0);
  const [datePublished, setDatePublished] = useState("");
  const [commentInput, setCommentInput] = useState(comment.commentText);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const fetchCurrentCommentLikes = async () => {
    const response = await getLikesCount(comment.commentId);
    setCurrentCommentLikesCount(response);
  };
  const updateLikesAndComments = async () => {
    const response = await getCurrentuserCurrentvideoLikes(id);
    setCurrentUserCommentLikes(response);
  };
  const requestLogin = (key) => {
    if (key === "r") {
      setMessage("");
    } else if (key === "a") {
      setMessage("Please Login to Like or Dislike a Comment on the video");
    }
  };

  const buttonClicked = async (id) => {
    if (id === "like") {
      if (
        currentUserLike.likeOrDislike === undefined ||
        currentUserLike.likeOrDislike === ""
      ) {
        await updateCommentLikeorDislike(
          comment.commentId,
          "",
          "like",
          currentUserLike.videoId
        );
        await updateLikesAndComments();
        setCurrentCommentLikesCount(currentCommentLikesCount + 1);
      } else if (currentUserLike.likeOrDislike === "like") {
        await updateCommentLikeorDislike(
          comment.commentId,
          currentUserLike.commentLikesId,
          "",
          currentUserLike.videoId
        );
        await updateLikesAndComments();
        setCurrentCommentLikesCount(currentCommentLikesCount - 1);
      } else if (currentUserLike.likeOrDislike === "dislike") {
        await updateCommentLikeorDislike(
          comment.commentId,
          currentUserLike.commentLikesId,
          "like",
          currentUserLike.videoId
        );
        await updateLikesAndComments();
        setCurrentCommentLikesCount(currentCommentLikesCount + 1);
      }
    } else if (id === "dislike") {
      if (
        currentUserLike.likeOrDislike == undefined ||
        currentUserLike.likeOrDislike === ""
      ) {
        await updateCommentLikeorDislike(
          comment.commentId,
          "",
          "dislike",
          currentUserLike.videoId
        );
        await updateLikesAndComments();
      } else if (currentUserLike.likeOrDislike === "like") {
        await updateCommentLikeorDislike(
          comment.commentId,
          currentUserLike.commentLikesId,
          "dislike",
          currentUserLike.videoId
        );
        await updateLikesAndComments();
        setCurrentCommentLikesCount(currentCommentLikesCount - 1);
      } else if (currentUserLike.likeOrDislike === "dislike") {
        await updateCommentLikeorDislike(
          comment.commentId,
          currentUserLike.commentLikesId,
          "",
          currentUserLike.videoId
        );
        await updateLikesAndComments();
      }
    }
  };

  const onUpdateComment = async () => {
    await updateComment(comment.commentId, commentInput);
    setIsReadOnly(true);
    setCurrentComments((prevArray) =>
      prevArray.map((prevComment) =>
        prevComment.commentId === comment.uid
          ? { ...prevComment, commentText: commentInput }
          : prevComment
      )
    );
  };

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
  }, [comment]);

  useEffect(() => {
    fetchCurrentCommentLikes();
    const answer = currentUserCommentLikes.find((element) => {
      return comment.commentId === element.commentId;
    });
    if (answer) {
      setCurrentUserLike(answer);
    }
    setLoading(false);
  }, [currentUserCommentLikes]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (auth.currentUser) {
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
              <textarea
                readOnly={isReadOnly}
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="focus:outline-none text-black w-full"
                rows={4}
                style={{
                  fontSize: "14px",
                  marginTop: "2px",
                  display: "block",
                  // overflow: "hidden",
                  resize: "block",
                }}
              />

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
                  {currentUserLike?.likeOrDislike !== "like" ? (
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
                  )}
                </div>
                <div>{currentCommentLikesCount}</div>
              </div>
              <div
                className=" my-auto cursor-pointer"
                onClick={() => buttonClicked("dislike")}
              >
                {currentUserLike?.likeOrDislike !== "dislike" ? (
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
                )}
              </div>
              <div className="">Reply</div>
              {auth.currentUser?.uid === comment.uid ? (
                <div className="flex flex-row gap-4">
                  <div className="">
                    {isReadOnly ? (
                      <button onClick={() => setIsReadOnly(false)}>
                        Edit Comment
                      </button>
                    ) : (
                      <button onClick={onUpdateComment}>Save Comment</button>
                    )}
                  </div>
                  <div>
                    {<button onClick={deleteComment}>Delete Comment</button>}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </>
    );
  } else {
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
              <textarea
                readOnly={isReadOnly}
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="focus:outline-none text-black w-full"
                rows={4}
                style={{
                  fontSize: "14px",
                  marginTop: "2px",
                  display: "block",
                  // overflow: "hidden",
                  resize: "block",
                }}
              />

              {/* <p
              className="text-black"
              style={{ fontSize: "14px", marginTop: "2px" }}
            >
              {comment.commentText}
            </p> */}
            </div>
            <div>
              {message !== "" ? (
                <>
                  <div className="flex flex-row">
                    <p className="my-auto">{message}</p>
                    <button
                      className="my-auto"
                      onClick={() => requestLogin("r")}
                    >
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
            <div className="contianer flex flex-row justify-start items-start gap-4 mt-3">
              <div className=" flex flex-row gap-2">
                <div
                  className="my-auto cursor-pointer"
                  onClick={() => requestLogin("a")}
                >
                  {currentUserLike?.likeOrDislike !== "like" ? (
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
                  )}
                </div>
                <div>{currentCommentLikesCount}</div>
              </div>
              <div
                className=" my-auto cursor-pointer"
                onClick={() => requestLogin("a")}
              >
                {currentUserLike?.likeOrDislike !== "dislike" ? (
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
                )}
              </div>
              <div className="">Reply</div>
              {auth.currentUser &&
              "uid" in comment &&
              auth.currentUser.uid === comment.uid ? (
                <div className="">
                  {isReadOnly ? (
                    <button onClick={() => setIsReadOnly(false)}>
                      Edit Comment
                    </button>
                  ) : (
                    <button onClick={onUpdateComment}>Save Comment</button>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CommentsCard;
