// import { useEffect, useState } from "react";
// import { Link, Outlet, useLocation, useParams } from "react-router-dom";
// import { getChannelVideos } from "../services/firebase.js";
// import { currentChannelDetail } from "../services/firebase.js";
// import { Routes, Route } from "react-router-dom";
// import DashboardVideos from "../components/channelDetail/dashboardVideos.jsx";
// import UploadVideos from "../components/channelDetail/uploadVideos.jsx";
// import Profile from "../components/channelDetail/profile.jsx";
// import { useUser } from "../context/User.jsx";
// import EditProfile from "./../components/channelDetail/editProfile";
// import Loader from "../components/Loader.jsx";

// function ChannelsDetail() {
//   const { id } = useParams();
//   const location = useLocation();
//   const [currentId, setCurrentId] = useState(id);
//   const [channelDetail, setChannelDetail] = useState({});
//   const [currentChannelVideos, setCurrentChannelVideos] = useState([]);
//   const { myChannelLink } = useUser();
//   const returnActiveClasses = () => {
//     return "text-black  font-semibold border-b-4 pb-3 border-black";
//   };
//   useEffect(() => {
//     setCurrentId(id);
//   }, [id]);

//   const fetchChannelDetail = async () => {
//     if (typeof id === "string") {
//       const channelResponse = await currentChannelDetail(id);
//       setChannelDetail(channelResponse);
//       const videoResponse = await getChannelVideos(id);
//       setCurrentChannelVideos(videoResponse);
//     } else {
//       setChannelDetail({ error: "Video Doesn't exists" });
//     }
//   };

//   useEffect(() => {
//     fetchChannelDetail();
//   }, [currentId]);

//   if (channelDetail.channelsId) {
//     return (
//       <>
//         <div className="container mt-2 sm:w-5/6 flex flex-col mx-auto mb-10 px-4 sm:px-0">
//           <div className="container h-64">
//             <img
//               src={channelDetail.channelCover}
//               className="rounded-2xl h-full w-full object-cover"
//               alt=""
//             />
//           </div>
//           <div className="container sm:flex sm:flex-row mt-8 ">
//             <div
//               className="my-auto"
//               style={{
//                 minHeight: "160px",
//                 minWidth: "160px",
//                 height: "160px",
//                 width: "160px",
//               }}
//             >
//               <img
//                 src={channelDetail.channelImage}
//                 className=" rounded-full w-full h-full object-cover"
//                 alt=""
//               />
//             </div>
//             <div className="flex flex-col gap-4 sm:ml-6 ">
//               <h2 className="font-bold text-4xl">
//                 {channelDetail.channelName}
//               </h2>
//               <p className="text-sm text-neutral-500">
//                 @channelid • {channelDetail?.Subscribers} subscribers •
//                 {channelDetail?.videos
//                   ? " " + channelDetail.videos.length + " Videos"
//                   : " 0 Video"}
//               </p>

//               <p className="text-sm text-neutral-500	">
//                 {channelDetail.channelAbout?.length > 30
//                   ? channelDetail.channelAbout.slice(0, 100) + "..."
//                   : channelDetail.channelAbout}
//                 {/* {channelDetail.channelAbout} */}
//               </p>
//               <button
//                 type="button"
//                 className="hover:bg-slate-800 bg-black text-white p-2 rounded-full px-4 mr-auto"
//               >
//                 Subscribe
//               </button>
//             </div>
//           </div>
//           <div className="flex flex-row gap-5 mt-5 text-neutral-700 border-b-2">
//             <Link
//               to={"/channels/" + id}
//               className={
//                 location.pathname == "/channels/" + id
//                   ? returnActiveClasses()
//                   : ""
//               }
//             >
//               Videos
//             </Link>

//             <Link
//               to={"/channels/" + id + "/profile"}
//               className={
//                 location.pathname == "/channels/" + id + "/profile"
//                   ? returnActiveClasses()
//                   : ""
//               }
//             >
//               Profile
//             </Link>

//             {myChannelLink === id ? (
//               <>
//                 <Link
//                   to={"/channels/" + id + "/upload"}
//                   className={
//                     location.pathname == "/channels/" + id + "/upload"
//                       ? returnActiveClasses()
//                       : ""
//                   }
//                 >
//                   Upload Videos
//                 </Link>
//                 <Link
//                   to={"/channels/" + id + "/edit_profile"}
//                   className={
//                     location.pathname == "/channels/" + id + "/edit_profile"
//                       ? returnActiveClasses()
//                       : ""
//                   }
//                 >
//                   Edit Profile
//                 </Link>
//               </>
//             ) : (
//               <></>
//             )}
//           </div>
//           <Routes>
//             <Route
//               exact
//               path="/"
//               element={
//                 <DashboardVideos
//                   id={id}
//                   currentChannelVideos={currentChannelVideos}
//                 />
//               }
//             />
//             <Route
//               path="upload"
//               element={
//                 <UploadVideos
//                   id={id}
//                   currentChannelVideos={currentChannelVideos}
//                   setCurrentChannelVideos={setCurrentChannelVideos}
//                 />
//               }
//             />
//             <Route
//               path="edit_profile"
//               element={
//                 <EditProfile
//                   channelDetail={channelDetail}
//                   setChannelDetail={setChannelDetail}
//                   id={id}
//                   //   currentChannelVideos={currentChannelVideos}
//                 />
//               }
//             />
//             <Route
//               path="profile"
//               element={
//                 <Profile
//                   id={id}
//                   currentChannelVideos={currentChannelVideos}
//                   channelDetail={channelDetail}
//                   setCurrentId={setCurrentId}
//                 />
//               }
//             />
//           </Routes>

//           <Outlet />

//           {/* <div className="container">
//             <div className="video-wrapper grid grid-cols-3 gap-3 mt-6 mb-5">
//               {currentChannelVideos.map((video) => (
//                 <VideoCard key={video.id} video={video} />
//               ))}
//             </div>
//           </div> */}
//         </div>
//       </>
//     );
//   } else if (channelDetail.error) {
//     return <h1>404 Error</h1>;
//   } else if (id == undefined) {
//     return <h1>404 Error</h1>;
//   } else {
//     return <Loader height={"70vh"} />;
//   }
// }

// export default ChannelsDetail;

// Conditional Rendering Logic: Consider extracting some of the conditional rendering logic into separate functions or components to improve readability. For example, the logic for generating active classes for navigation links could be extracted into a separate function.

// Destructuring Props: When using props in your component, consider destructuring them directly in the function signature to improve readability and avoid repetition.

// Consistent Formatting: Ensure consistent formatting throughout your codebase. For instance, consistently use either single or double quotes for string literals.

// Inline Styles: Instead of using inline styles, consider using Tailwind CSS utility classes for styling to maintain consistency and improve maintainability.

import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import {
  getChannelVideos,
  currentChannelDetail,
} from "../services/firebase.js";
import { Routes, Route } from "react-router-dom";
import DashboardVideos from "../components/channelDetail/dashboardVideos.jsx";
import UploadVideos from "../components/channelDetail/uploadVideos.jsx";
import Profile from "../components/channelDetail/profile.jsx";
import { useUser } from "../context/User.jsx";
import EditProfile from "./../components/channelDetail/editProfile";
import Loader from "../components/Loader.jsx";

function ChannelsDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [currentId, setCurrentId] = useState(id);
  const [channelDetail, setChannelDetail] = useState({});
  const [currentChannelVideos, setCurrentChannelVideos] = useState([]);
  const { myChannelLink } = useUser();

  useEffect(() => {
    setCurrentId(id);
  }, [id]);

  useEffect(() => {
    const fetchChannelDetail = async () => {
      try {
        const channelResponse = await currentChannelDetail(id);
        setChannelDetail(channelResponse);
        const videoResponse = await getChannelVideos(id);
        setCurrentChannelVideos(videoResponse);
      } catch (error) {
        setChannelDetail({ error: "Channel details not found" });
      }
    };

    fetchChannelDetail();
  }, [currentId]);

  const returnActiveClasses = (pathname) => {
    return location.pathname === pathname
      ? "text-black font-semibold border-b-4 pb-3 border-black"
      : "";
  };

  if (!channelDetail.channelsId) {
    return <Loader height={"70vh"} />;
  }

  if (channelDetail.error || id === undefined) {
    return <h1>404 Error</h1>;
  }

  return (
    <div className="container mt-2 sm:w-5/6 flex flex-col mx-auto mb-10 px-4 sm:px-0">
      <div className="container h-64">
        <img
          src={channelDetail.channelCover}
          className="rounded-2xl h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="container sm:flex sm:flex-row mt-8">
        <div
          className="my-auto"
          style={{
            minHeight: "160px",
            minWidth: "160px",
            height: "160px",
            width: "160px",
          }}
        >
          <img
            src={channelDetail.channelImage}
            className="rounded-full w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-4 sm:ml-6">
          <h2 className="font-bold text-4xl">{channelDetail.channelName}</h2>
          <p className="text-sm text-neutral-500">
            @{channelDetail.channelId} • {channelDetail?.Subscribers}{" "}
            subscribers •{" "}
            {channelDetail?.videos
              ? ` ${channelDetail.videos.length} Videos`
              : "0 Video"}
          </p>
          <p className="text-sm text-neutral-500">
            {channelDetail.channelAbout?.length > 30
              ? `${channelDetail.channelAbout.slice(0, 100)}...`
              : channelDetail.channelAbout}
          </p>
          <button
            type="button"
            className="hover:bg-slate-800 bg-black text-white p-2 rounded-full px-4 mr-auto"
          >
            Subscribe
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-5 mt-5 text-neutral-700 border-b-2">
        <Link
          to={`/channels/${id}`}
          className={returnActiveClasses(`/channels/${id}`)}
        >
          Videos
        </Link>
        <Link
          to={`/channels/${id}/profile`}
          className={returnActiveClasses(`/channels/${id}/profile`)}
        >
          Profile
        </Link>
        {myChannelLink === id && (
          <>
            <Link
              to={`/channels/${id}/upload`}
              className={returnActiveClasses(`/channels/${id}/upload`)}
            >
              Upload Videos
            </Link>
            <Link
              to={`/channels/${id}/edit_profile`}
              className={returnActiveClasses(`/channels/${id}/edit_profile`)}
            >
              Edit Profile
            </Link>
          </>
        )}
      </div>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <DashboardVideos
              id={id}
              currentChannelVideos={currentChannelVideos}
            />
          }
        />
        <Route
          path="upload"
          element={
            <UploadVideos
              id={id}
              currentChannelVideos={currentChannelVideos}
              setCurrentChannelVideos={setCurrentChannelVideos}
            />
          }
        />
        <Route
          path="edit_profile"
          element={
            <EditProfile
              channelDetail={channelDetail}
              setChannelDetail={setChannelDetail}
              id={id}
            />
          }
        />
        <Route
          path="profile"
          element={
            <Profile
              id={id}
              currentChannelVideos={currentChannelVideos}
              channelDetail={channelDetail}
              setCurrentId={setCurrentId}
            />
          }
        />
      </Routes>
      <Outlet />
    </div>
  );
}

export default ChannelsDetail;
