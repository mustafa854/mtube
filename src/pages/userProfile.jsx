// import { Link } from "react-router-dom";
// import { useUser } from "../context/User.jsx";
// import { isAuthenticated, userAccountDetails } from "../services/firebase.js";
// import { auth } from "../config/firebase-config.js";

// function UserProfile() {
//   const { myChannelLink, setMyChannelLink, userDetails, setUserDetails } =
//     useUser();

//   if (auth.currentUser === null) {
//     return (
//       <>
//         <div
//           className="container flex justify-center content-center w-full"
//           style={{ minHeight: "80vh" }}
//         >
//           <h1 className="my-auto text-5xl">Please Login First</h1>
//         </div>
//       </>
//     );
//   }
//   return (
//     <>
//       <div
//         className="container flex flex-col justify-center content-center px-4"
//         style={{ height: "80vh" }}
//       >
//         <div className="mx-auto border-2 flex flex-col p-6 rounded-xl gap-4">
//           <div className="flex flex-row gap-3 content-center justify-center">
//             <div className="grow">
//               <img
//                 src={userDetails.photo}
//                 alt=""
//                 className="mx-auto rounded-xl"
//                 style={{
//                   width: "80px",
//                   height: "80px",
//                   objectFit: "cover",
//                 }}
//               />
//             </div>
//           </div>
//           <div className="flex flex-row gap-3 content-center justify-center">
//             <div className="my-auto">
//               <p className="my-auto font-bold	">User Email:</p>
//             </div>
//             <div>
//               <p className="my-auto">{userDetails.email}</p>
//             </div>
//           </div>
//           <div className="flex flex-row gap-3  content-center justify-center">
//             <div className="my-auto">
//               <p className="my-auto font-bold	">Display Name:</p>
//             </div>
//             <div>
//               <p className="my-auto">{userDetails.name}</p>
//             </div>
//           </div>
//           <div className="flex flex-row gap-3  content-center justify-center">
//             <div className="my-auto">
//               <p className="my-auto font-bold	">Signup Method:</p>
//             </div>
//             <div>
//               <p className="my-auto">{userDetails.registerMethod}</p>
//             </div>
//           </div>
//           {myChannelLink !== "" && myChannelLink !== undefined ? (
//             <div className="flex flex-row gap-3  content-center justify-center">
//               <div className="my-auto">
//                 <p className="my-auto font-bold	">Channel Link:</p>
//               </div>
//               <div>
//                 <Link to={"/channels/" + myChannelLink}>
//                   <p className="my-auto text-sky-600">
//                     {"https://localhost/channels/" + myChannelLink}
//                   </p>
//                 </Link>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-row gap-3  content-center justify-center">
//               <div className="my-auto">
//                 <Link
//                   type="button"
//                   className="hover:bg-slate-800 bg-black text-white p-2 px-4 ml-5 rounded-md"
//                   to="/create-channels/"
//                 >
//                   Create Channel
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default UserProfile;

// Authentication Check: You're checking if the current user is authenticated using auth.currentUser === null. While this works, you might want to consider using the isAuthenticated function from your Firebase authentication service for consistency and abstraction.

// User Details Loading: It seems like you're fetching user details asynchronously from Firebase. It's a good practice to handle loading states while fetching user details to provide a better user experience.

// Conditional Rendering: Your conditional rendering logic for displaying user details and the channel link or the option to create a channel is clear and concise.

import { Link } from "react-router-dom";
import { useUser } from "../context/User.jsx";
import { isAuthenticated, userAccountDetails } from "../services/firebase.js";
import { auth } from "../config/firebase-config.js";
import Loader from "../components/Loader";

function UserProfile() {
  const { myChannelLink, setMyChannelLink, userDetails, setUserDetails } =
    useUser();

  if (!isAuthenticated()) {
    return (
      <div
        className="container flex justify-center content-center w-full"
        style={{ minHeight: "80vh" }}
      >
        <h1 className="my-auto text-5xl">Please Login First</h1>
      </div>
    );
  }

  if (!userDetails) {
    // Handle loading state while fetching user details
    return <Loader height="80vh" />;
  }

  return (
    <div
      className="container flex flex-col justify-center content-center px-4"
      style={{ height: "80vh" }}
    >
      <div className="mx-auto border-2 flex flex-col p-6 rounded-xl gap-4">
        <div className="flex flex-row gap-3 content-center justify-center">
          <div className="grow">
            <img
              src={userDetails.photo}
              alt=""
              className="mx-auto rounded-xl"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="flex flex-row gap-3 content-center justify-center">
          <div className="my-auto">
            <p className="my-auto font-bold">User Email:</p>
          </div>
          <div>
            <p className="my-auto">{userDetails.email}</p>
          </div>
        </div>
        <div className="flex flex-row gap-3 content-center justify-center">
          <div className="my-auto">
            <p className="my-auto font-bold">Display Name:</p>
          </div>
          <div>
            <p className="my-auto">{userDetails.name}</p>
          </div>
        </div>
        <div className="flex flex-row gap-3 content-center justify-center">
          <div className="my-auto">
            <p className="my-auto font-bold">Signup Method:</p>
          </div>
          <div>
            <p className="my-auto">{userDetails.registerMethod}</p>
          </div>
        </div>
        {myChannelLink ? (
          <div className="flex flex-row gap-3 content-center justify-center">
            <div className="my-auto">
              <p className="my-auto font-bold">Channel Link:</p>
            </div>
            <div>
              <Link to={`/channels/${myChannelLink}`}>
                <p className="my-auto text-sky-600">{`https://localhost/channels/${myChannelLink}`}</p>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-3 content-center justify-center">
            <div className="my-auto">
              <Link
                type="button"
                className="hover:bg-slate-800 bg-black text-white p-2 px-4 ml-5 rounded-md"
                to="/create-channels/"
              >
                Create Channel
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
