// import { useState } from "react";
// import { getCommentCounts } from "../utils/comments/getCommentCount";
// import { postComment } from "../utils/comments/postComment";
// import { auth } from "../config/firebase-config";
// import { postCommentReply } from "../utils/comments/commentReply/postCommentReply";

// function CommentReplyForm({
//   commentId,
//   toReplyUserName,
//   videoId,
//   setCommentReplyFormVisible,
//   commentsCount,
//   setCommentsCount,
//   setCurrentCommentReply,
//   setCommentReply,
// }) {
//   const [commentInput, setCommentInput] = useState("");
//   const onSubmitForm = async (e) => {
//     e.preventDefault();
//     const response = await postCommentReply(
//       commentId,
//       commentInput,
//       toReplyUserName,
//       videoId
//     );
//     setCommentsCount(commentsCount + 1);
//     setCurrentCommentReply((prevArray) => [...prevArray, response]);

//     setCommentReply((prevArray) => [...prevArray, response]);

//     setCommentInput("");
//     setCommentReplyFormVisible(false);
//   };
//   if (auth.currentUser) {
//     return (
//       <>
//         <div className="container flex flex-row">
//           <div className="container" style={{ width: "50px" }}>
//             <img
//               src={auth.currentUser.photoURL}
//               style={{
//                 height: "40px",
//                 width: "40px",
//                 borderRadius: "500px",
//                 objectFit: "cover",
//               }}
//               alt=""
//             />
//           </div>
//           <div className="container ml-2">
//             <input
//               type="text"
//               placeholder="Add a comment..."
//               className="border-b w-full  pb-1 font-normal text-black focus:outline-none placeholder:font-normal placeholder:text-black"
//               onChange={(e) => setCommentInput(e.target.value)}
//               value={commentInput}
//             />
//             <button
//               className="mt-2  bg-black hover:bg-slate-900 text-white py-1 text-sm mx-auto px-2 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//               onClick={onSubmitForm}
//             >
//               Reply
//             </button>
//             <button
//               className="mt-2 ml-2  bg-black hover:bg-slate-900 text-white py-1 text-sm mx-auto px-2 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//               onClick={() => setCommentReplyFormVisible(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// export default CommentReplyForm;

// Form Submission Logic: Ensure that the form submission logic is robust. Validate user input and handle edge cases gracefully to prevent unexpected behavior.

// Error Handling: Implement error handling for asynchronous operations like posting comments or replies. Provide feedback to users in case of errors and guide them on how to proceed.

// State Management: Consider using a state management library like Redux for managing complex state across your application, especially if you anticipate the need for shared state between components.

// Consistent Naming: Maintain consistent naming conventions for variables and functions to improve code readability and maintainability.

// Accessibility: Ensure that form inputs and buttons are accessible to users with disabilities. Provide appropriate labels and ensure keyboard navigation is possible.

// Code Organization: Break down the component into smaller, reusable components where appropriate to improve code maintainability and reusability.

import { useState } from "react";
import { postCommentReply } from "../utils/comments/commentReply/postCommentReply";
import { auth } from "../config/firebase-config";

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
    try {
      if (!commentInput.trim()) {
        // Handle empty comment input
        return;
      }

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
    } catch (error) {
      console.error("Error posting comment reply:", error);
      // Handle error
    }
  };

  if (auth.currentUser) {
    return (
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
          <form onSubmit={onSubmitForm}>
            <input
              type="text"
              placeholder="Add a comment..."
              className="border-b w-full  pb-1 font-normal text-black focus:outline-none placeholder:font-normal placeholder:text-black"
              onChange={(e) => setCommentInput(e.target.value)}
              value={commentInput}
            />
            <div className="flex">
              <button
                type="submit"
                className="mt-2 mr-2 bg-black hover:bg-slate-900 text-white py-1 text-sm px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Reply
              </button>
              <button
                type="button"
                className="mt-2 bg-black hover:bg-slate-900 text-white py-1 text-sm px-2 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setCommentReplyFormVisible(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default CommentReplyForm;
