// import { auth } from "../config/firebase-config";
// import CommentsCard from "./CommentsCard";
import { getCommentCounts } from "../utils/comments/getCommentCount";
// import { useEffect, useState } from "react";
import { getCurrentVideoComments } from "../utils/comments/getCurrentVideoComments";
// import CommentsForm from "./CommentsForm";
import { getCurrentuserCurrentvideoLikes } from "../utils/comments/like/getCurrentuserCurrentvideoLikes";
import { getCommentReply } from "../utils/comments/commentReply/getCommentReply";
import { getCurrentVideoCommentReplyLikes } from "../utils/comments/commentReply/like/getCurrentVideoCommentReplyLikes";

// function Comments({ id }) {
//   const [commentsCount, setCommentsCount] = useState(0);
//   const [currentComments, setCurrentComments] = useState([]);
//   const [currentUserCommentLikes, setCurrentUserCommentLikes] = useState([]);
//   const [message, setMessage] = useState("");
//   const [commentReply, setCommentReply] = useState([]);
//   const [currentCommentReplyLikes, setCurrentCommentReplyLikes] = useState([]);

//   const requestLogin = (key) => {
//     if (key === "r") {
//       setMessage("");
//     } else if (key === "a") {
//       setMessage("Please Login to post Comment on the video");
//     }
//   };

//   const fetchCommentsCountLikesReply = async () => {
//     const response = await getCommentCounts(id);
//     setCommentsCount(response);
//     const commentLikes = await getCurrentuserCurrentvideoLikes(id);
//     setCurrentUserCommentLikes(commentLikes);
//   };

//   const fetchCurrentVideoCommentsAndReply = async () => {
//     const commentsResponse = await getCurrentVideoComments(id);
//     setCurrentComments(commentsResponse);
//     const commentReplyResponse = await getCommentReply(id);
//     setCommentReply(commentReplyResponse);
//     const commentReplyLikesResponse = await getCurrentVideoCommentReplyLikes(
//       id
//     );
//     setCurrentCommentReplyLikes(commentReplyLikesResponse);
//   };
//   useEffect(() => {
//     fetchCommentsCountLikesReply();
//     fetchCurrentVideoCommentsAndReply();
//   }, []);
//   useEffect(() => {
//     setCommentsCount(0);
//     setCurrentComments([]);
//     fetchCommentsCountLikesReply();
//     fetchCurrentVideoCommentsAndReply();
//   }, [id]);
//   return (
//     <>
//       <div className="flex flex-row">
//         <h1 className="text-xl font-bold">{commentsCount} Comments</h1>
//         {/* <u>sort By</u> */}
//       </div>
//       <div>
//         {message !== "" ? (
//           <>
//             <div className="flex flex-row">
//               <p className="my-auto">{message}</p>
//               <button className="my-auto" onClick={() => requestLogin("r")}>
//                 <svg
//                   className="my-auto"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 16 16"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="1.5"
//                     d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </>
//         ) : (
//           <p>{message}</p>
//         )}
//       </div>
//       <div className="container flex flex-row mt-5">
//         <div className="flex-none">
//           <img
//             src={
//               auth.currentUser?.photoURL === undefined
//                 ? "/assets/profile.jpeg"
//                 : auth.currentUser.photoURL
//             }
//             className="rounded-full"
//             alt=""
//             style={{ width: "40px", height: "40px" }}
//           />
//         </div>
//         <div className="grow">
//           <CommentsForm
//             id={id}
//             commentsCount={commentsCount}
//             setCommentsCount={setCommentsCount}
//             setCurrentComments={setCurrentComments}
//             message={message}
//             setMessage={setMessage}
//             requestLogin={requestLogin}
//           />
//         </div>
//       </div>
//       <div className="container mt-8">
//         {currentComments.map((comment) => {
//           return (
//             <>
//               <CommentsCard
//                 currentCommentReplyLikes={currentCommentReplyLikes}
//                 setCurrentCommentReplyLikes={setCurrentCommentReplyLikes}
//                 key={comment.commentId}
//                 id={id}
//                 comment={comment}
//                 currentComments={currentComments}
//                 setCurrentComments={setCurrentComments}
//                 currentUserCommentLikes={currentUserCommentLikes}
//                 setCurrentUserCommentLikes={setCurrentUserCommentLikes}
//                 commentsCount={commentsCount}
//                 setCommentsCount={setCommentsCount}
//                 commentReply={commentReply}
//                 setCommentReply={setCommentReply}
//               />
//             </>
//           );
//         })}
//       </div>
//     </>
//   );
// }

// export default Comments;

// Conditional Rendering: You have conditional rendering based on whether the user is logged in or not. It might be helpful to provide a login prompt or a login button to make it easier for users to log in directly from the comment section.

// Error Handling: Consider adding error handling for asynchronous operations such as fetching comments and likes. Displaying an error message or retry option can improve the user experience in case of network failures or other errors.

// Component Composition: Break down the component into smaller, more focused components to improve readability and maintainability. For example, you could create separate components for the comment form, individual comments, and comment replies.

// Performance Optimization: If dealing with a large number of comments and replies, consider implementing pagination or lazy loading to improve performance. This will prevent loading all comments at once and enhance the user experience.

// Consistent Styling: Ensure consistent styling across your application to provide a seamless user experience. This includes font sizes, colors, spacing, and alignment.

// Optimize State Management: Review the state management approach to ensure optimal performance. Consider using libraries like Redux or Recoil for managing complex state or context API for simpler scenarios.

// Accessibility: Make sure your comments section is accessible to all users, including those who rely on screen readers or keyboard navigation. Ensure that interactive elements are keyboard accessible and provide alternative text for non-text content like images.

// Testing: Implement unit tests and integration tests for your component to ensure its functionality works as expected across different scenarios. This will help catch bugs early and maintain stability as you make changes to your codebase.

import { useEffect, useState } from "react";
import { auth } from "../config/firebase-config";
import CommentsCard from "./CommentsCard";
import CommentsForm from "./CommentsForm";
// import {
//   getCurrentVideoComments,
//   getCurrentuserCurrentvideoLikes,
// } from "../utils/comments";
// import { getCommentReply } from "../utils/comments/commentReply";
// import {
//   getCurrentVideoCommentReplyLikes,
//   getCommentCounts,
// } from "../utils/comments/helpers";

function Comments({ id }) {
  const [commentsCount, setCommentsCount] = useState(0);
  const [currentComments, setCurrentComments] = useState([]);
  const [currentUserCommentLikes, setCurrentUserCommentLikes] = useState([]);
  const [message, setMessage] = useState("");
  const [commentReply, setCommentReply] = useState([]);
  const [currentCommentReplyLikes, setCurrentCommentReplyLikes] = useState([]);

  const fetchCommentsData = async () => {
    try {
      const commentsResponse = await getCurrentVideoComments(id);
      setCurrentComments(commentsResponse);
      const commentReplyResponse = await getCommentReply(id);
      setCommentReply(commentReplyResponse);
      const commentReplyLikesResponse = await getCurrentVideoCommentReplyLikes(
        id
      );
      setCurrentCommentReplyLikes(commentReplyLikesResponse);
      const commentsCountResponse = await getCommentCounts(id);
      setCommentsCount(commentsCountResponse);
      const commentLikes = await getCurrentuserCurrentvideoLikes(id);
      setCurrentUserCommentLikes(commentLikes);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchCommentsData();
  }, [id]);

  const requestLogin = (key) => {
    if (key === "r") {
      setMessage("");
    } else if (key === "a") {
      setMessage("Please login to post a comment on the video.");
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <h1 className="text-xl font-bold">{commentsCount} Comments</h1>
      </div>
      <div>
        {message && (
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
        )}
      </div>
      <div className="container flex flex-row mt-5">
        <div className="flex-none">
          <img
            src={auth.currentUser?.photoURL || "/assets/profile.jpeg"}
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
        {currentComments.map((comment) => (
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
            currentCommentReplyLikes={currentCommentReplyLikes}
            setCurrentCommentReplyLikes={setCurrentCommentReplyLikes}
          />
        ))}
      </div>
    </>
  );
}

export default Comments;
