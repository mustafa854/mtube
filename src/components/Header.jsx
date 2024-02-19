// import { Link } from "react-router-dom";
// import { googleSignin, userSignOut } from "../services/firebase.js";
// import { auth } from "../config/firebase-config.js";
// import { useUser } from "../context/User.jsx";
// import SearchForm from "./search/searchForm.jsx";

// function Header() {
//   const { myChannelLink, userDetails } = useUser();

//   const signIn = async () => {
//     await googleSignin();
//   };
//   const signOut = async () => {
//     userSignOut();
//   };

//   return (
//     <>
//       <div className="lg:container mx-auto p-4 flex flex-row justify-between	items-center">
//         <div className="flex flex-row gap-x-4">
//           <div>
//             <img className="header-icon" src="/assets/menu.svg" alt="" />
//           </div>
//           <div>
//             <Link to={"/"}>
//               <img
//                 className="header-icon--logo"
//                 src="/assets/logo.svg"
//                 alt=""
//               />
//             </Link>
//           </div>
//         </div>
//         <div className="hidden lg:block">
//           <SearchForm />
//         </div>
//         <div className="flex flex-row sm:gap-8 gap-x-4 justify-center">
//           <div className="sm:flex sm:flex-row gap-4 lg:gap-8 hidden">
//             <Link to="/channels" className="my-auto">
//               <p>Channels</p>
//             </Link>
//             <Link to="/videos" className="my-auto">
//               <p>Videos</p>
//             </Link>
//           </div>
//           <div className="">
//             {auth.currentUser ? (
//               <>
//                 <div className="lg:container flex flex-row sm:gap-8 gap-4">
//                   {myChannelLink !== "" && myChannelLink !== undefined ? (
//                     <Link
//                       to={"/channels/" + myChannelLink}
//                       className="sm:flex sm:flex-row sm:justify-center sm:content-center hidden"
//                     >
//                       <p className="my-auto mr-2">My Channel</p>
//                     </Link>
//                   ) : (
//                     <Link
//                       to="/my-account"
//                       className="sm:flex sm:flex-row sm:justify-center sm:content-center hidden"
//                     >
//                       <p className="my-auto sm:mr-2">Create Channel</p>
//                     </Link>
//                   )}

//                   <div>
//                     <Link
//                       to="/my-account"
//                       className="flex flex-row justify-center content-center md:gap-8 gap-4"
//                     >
//                       {" "}
//                       <p className="my-auto sm:mr-2 sm:block hidden">
//                         My Account
//                       </p>
//                       <img
//                         src={userDetails.photo}
//                         alt=""
//                         className="mx-auto"
//                         style={{
//                           height: "30px",
//                           width: "30px",
//                           borderRadius: "500px",
//                         }}
//                       />
//                     </Link>
//                   </div>
//                   <button
//                     type="button"
//                     className="my-auto flex flex-row hover:bg-sky-100 hover:border-sky-100 justify-center	items-center text-sky-600 p-2 border border-slate-200 rounded-full pt-0 pb-1"
//                     onClick={signOut}
//                   >
//                     <img
//                       src="/assets/profile.svg"
//                       className="header-icon pt-1 pr-2 fill-current text-sky-600"
//                       alt=""
//                     />
//                     Logout
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <button
//                   type="button"
//                   className="flex flex-row hover:bg-sky-100 hover:border-sky-100 justify-center	items-center text-sky-600 p-2 border border-slate-200 rounded-full pt-0 pb-1"
//                   onClick={signIn}
//                 >
//                   <img
//                     src="/assets/profile.svg"
//                     className="header-icon pt-1 pr-2 fill-current text-sky-600"
//                     alt=""
//                   />
//                   Signin
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-row gap-8 gap-x-4 justify-center sm:hidden mx-auto mb-4">
//         <div className="flex flex-row gap-4 lg:gap-8">
//           <Link to="/channels" className="my-auto">
//             <p>Channels</p>
//           </Link>
//           <Link to="/videos" className="my-auto">
//             <p>Videos</p>
//           </Link>
//         </div>
//         <div className="">
//           {auth.currentUser ? (
//             <>
//               <div className="lg:container flex flex-row gap-4">
//                 {myChannelLink !== "" && myChannelLink !== undefined ? (
//                   <Link
//                     to={"/channels/" + myChannelLink}
//                     className="flex flex-row justify-center content-center"
//                   >
//                     <p className="my-auto mr-2">Channel</p>
//                   </Link>
//                 ) : (
//                   <Link
//                     to="/my-account"
//                     className="flex flex-row justify-center content-center"
//                   >
//                     <p className="my-auto mr-2">Create Channel</p>
//                   </Link>
//                 )}

//                 <div>
//                   <Link
//                     to="/my-account"
//                     className="flex flex-row justify-center content-center md:gap-8 gap-4"
//                   >
//                     {" "}
//                     <p className="my-auto mr-2 block">Account</p>
//                   </Link>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <>
//               <button
//                 type="button"
//                 className="flex flex-row hover:bg-sky-100 hover:border-sky-100 justify-center	items-center text-sky-600 p-2 border border-slate-200 rounded-full pt-0 pb-1"
//                 onClick={signIn}
//               >
//                 <img
//                   src="/assets/profile.svg"
//                   className="header-icon pt-1 pr-2 fill-current text-sky-600"
//                   alt=""
//                 />
//                 Signin
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       <div className="lg:container mx-auto flex flex-row justify-between items-center lg:hidden">
//         <SearchForm />
//       </div>
//     </>
//   );
// }

// export default Header;

// Inconsistent Naming Convention: Consistency in naming conventions improves code readability. Let's ensure that all variable names follow camelCase consistently.

// Conditional Rendering with auth.currentUser: Instead of directly accessing auth.currentUser in the JSX, it's better to handle authentication state using state management or context. This separation of concerns improves the component's testability and maintainability.

import { Link } from "react-router-dom";
import { googleSignin, userSignOut } from "../services/firebase.js";
import { useUser } from "../context/User.jsx";
import { auth } from "../config/firebase-config.js";
import SearchForm from "./search/searchForm.jsx";

function Header() {
  const { myChannelLink, userDetails, isAuthenticated } = useUser();

  const signIn = async () => {
    await googleSignin();
  };

  const signOut = async () => {
    userSignOut();
  };

  return (
    <>
      <div className="lg:container mx-auto p-4 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-x-4">
          <div>
            <img className="header-icon" src="/assets/menu.svg" alt="" />
          </div>
          <div>
            <Link to={"/"}>
              <img
                className="header-icon--logo"
                src="/assets/logo.svg"
                alt=""
              />
            </Link>
          </div>
        </div>
        <div className="hidden lg:block">
          <SearchForm />
        </div>
        <div className="flex flex-row sm:gap-8 gap-x-4 justify-center">
          <div className="sm:flex sm:flex-row gap-4 lg:gap-8 hidden">
            <Link to="/channels" className="my-auto">
              <p>Channels</p>
            </Link>
            <Link to="/videos" className="my-auto">
              <p>Videos</p>
            </Link>
          </div>
          <div className="">
            {isAuthenticated ? (
              <>
                <div className="lg:container flex flex-row sm:gap-8 gap-4">
                  {myChannelLink ? (
                    <Link
                      to={"/channels/" + myChannelLink}
                      className="sm:flex sm:flex-row sm:justify-center sm:content-center hidden"
                    >
                      <p className="my-auto mr-2">My Channel</p>
                    </Link>
                  ) : (
                    <Link
                      to="/my-account"
                      className="sm:flex sm:flex-row sm:justify-center sm:content-center hidden"
                    >
                      <p className="my-auto sm:mr-2">Create Channel</p>
                    </Link>
                  )}

                  <div>
                    <Link
                      to="/my-account"
                      className="flex flex-row justify-center content-center md:gap-8 gap-4"
                    >
                      <p className="my-auto sm:mr-2 sm:block hidden">
                        My Account
                      </p>
                      <img
                        src={userDetails.photo}
                        alt=""
                        className="mx-auto"
                        style={{
                          height: "30px",
                          width: "30px",
                          borderRadius: "500px",
                        }}
                      />
                    </Link>
                  </div>
                  <button
                    type="button"
                    className="my-auto flex flex-row hover:bg-sky-100 hover:border-sky-100 justify-center items-center text-sky-600 p-2 border border-slate-200 rounded-full pt-0 pb-1"
                    onClick={signOut}
                  >
                    <img
                      src="/assets/profile.svg"
                      className="header-icon pt-1 pr-2 fill-current text-sky-600"
                      alt=""
                    />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="flex flex-row hover:bg-sky-100 hover:border-sky-100 justify-center items-center text-sky-600 p-2 border border-slate-200 rounded-full pt-0 pb-1"
                  onClick={signIn}
                >
                  <img
                    src="/assets/profile.svg"
                    className="header-icon pt-1 pr-2 fill-current text-sky-600"
                    alt=""
                  />
                  Signin
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-8 gap-x-4 justify-center sm:hidden mx-auto mb-4">
        <div className="flex flex-row gap-4 lg:gap-8">
          <Link to="/channels" className="my-auto">
            <p>Channels</p>
          </Link>
          <Link to="/videos" className="my-auto">
            <p>Videos</p>
          </Link>
        </div>
        <div className="">
          {isAuthenticated ? (
            <>
              <div className="lg:container flex flex-row gap-4">
                {myChannelLink ? (
                  <Link
                    to={"/channels/" + myChannelLink}
                    className="flex flex-row justify-center content-center"
                  >
                    <p className="my-auto mr-2">Channel</p>
                  </Link>
                ) : (
                  <Link
                    to="/my-account"
                    className="flex flex-row justify-center content-center"
                  >
                    <p className="my-auto mr-2">Create Channel</p>
                  </Link>
                )}

                <div>
                  <Link
                    to="/my-account"
                    className="flex flex-row justify-center content-center md:gap-8 gap-4"
                  >
                    <p className="my-auto mr-2 block">Account</p>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                type="button"
                className="flex flex-row hover:bg-sky-100 hover:border-sky-100 justify-center items-center text-sky-600 p-2 border border-slate-200 rounded-full pt-0 pb-1"
                onClick={signIn}
              >
                <img
                  src="/assets/profile.svg"
                  className="header-icon pt-1 pr-2 fill-current text-sky-600"
                  alt=""
                />
                Signin
              </button>
            </>
          )}
        </div>
      </div>

      <div className="lg:container mx-auto flex flex-row justify-between items-center lg:hidden">
        <SearchForm />
      </div>
    </>
  );
}

export default Header;
