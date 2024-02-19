// import { useEffect, useState } from "react";
// import { useUser } from "../../context/User";
// import { currentChannelMeta } from "../../utils/currentChannelMeta";
// import { Link } from "react-router-dom";

// function Profile({ id, currentChannelVideos, channelDetail, setCurrentId }) {
//   const [currentChannelUserEmail, setCurrentChannelUserEmail] = useState([]);
//   const [currentChannelView, setCurrentChannelView] = useState("");
//   const getCurrentChannelViews = () => {
//     let views = 0;
//     let i = 0;
//     while (i < currentChannelVideos?.length) {
//       views = Number(currentChannelVideos[i].views) + views;
//       i = i + 1;
//     }
//     setCurrentChannelView(String(views));
//   };
//   const fetchChannelMeta = async () => {
//     const response = await currentChannelMeta(id);
//     setCurrentChannelUserEmail(response);
//   };
//   useEffect(() => {
//     fetchChannelMeta();
//     getCurrentChannelViews();
//   }, [id]);
//   return (
//     <>
//       <h3 className="text-black  font-semibold mt-3">Channel Name</h3>
//       <p>{channelDetail.channelName}</p>
//       <h3 className="text-black  font-semibold mt-3">About Channel</h3>
//       <p>{channelDetail.channelAbout}</p>
//       <div className="sm:flex sm:flex-row">
//         <div className="container">
//           <h3 className="text-black  font-semibold mt-3">Total Subscribers</h3>
//           <p>{channelDetail.Subscribers} Subscribers</p>
//         </div>
//         <div className="container">
//           <h3 className="text-black  font-semibold mt-3">Total Views</h3>
//           <p>
//             {currentChannelView === "" ? "Loading Views!" : currentChannelView}{" "}
//             Views
//           </p>
//         </div>
//         <div className="container">
//           <h3 className="text-black  font-semibold mt-3">Total videos</h3>
//           <p>
//             {channelDetail.videos?.length ? channelDetail.videos?.length : 0}{" "}
//             Videos
//           </p>
//         </div>
//         <div className="container">
//           <h3 className="text-black  font-semibold mt-3">Joined Date</h3>
//           <p>
//             {typeof channelDetail.createdAt === "string"
//               ? channelDetail.createdAt
//               : ""}
//           </p>
//         </div>
//       </div>
//       <h3 className="text-black  font-semibold mt-3">Channel Link</h3>
//       <Link to={"/channels/" + id}>
//         <p className="text-sky-600">
//           {"https://localhost:5173/channels/" + id}
//         </p>
//       </Link>
//       <h3 className="text-black  font-semibold mt-3">Email:</h3>
//       <Link to={"mailto:" + currentChannelUserEmail}>
//         <p className="text-sky-600">{currentChannelUserEmail}</p>
//       </Link>
//     </>
//   );
// }

// export default Profile;

// Avoid Nested Rendering Logic: Instead of nesting multiple if conditions or ternary operators inside the JSX, consider extracting complex logic into separate functions or variables for better readability.

// Use of Hooks Dependency Array: Ensure the dependency array of the useEffect hook is correctly set to avoid unnecessary re-renders. In this case, id seems to be the only dependency, which seems appropriate.

// Consistent Naming and Formatting: Maintain consistent naming conventions and formatting throughout the component for better code consistency and readability.

// Error Handling: Implement error handling for API requests to provide better user feedback in case of errors.

// Optimize Total Views Calculation: Instead of iterating through all videos to calculate the total views, you can directly sum the views using the reduce method, which is more efficient.

import { useEffect, useState } from "react";
import { useUser } from "../../context/User";
import { currentChannelMeta } from "../../utils/currentChannelMeta";
import { Link } from "react-router-dom";

function Profile({ id, currentChannelVideos, channelDetail, setCurrentId }) {
  const [currentChannelUserEmail, setCurrentChannelUserEmail] = useState("");
  const [currentChannelView, setCurrentChannelView] = useState("");

  const fetchChannelMeta = async () => {
    try {
      const response = await currentChannelMeta(id);
      setCurrentChannelUserEmail(response);
    } catch (error) {
      console.error("Error fetching channel meta:", error);
    }
  };

  useEffect(() => {
    fetchChannelMeta();
  }, [id]);

  useEffect(() => {
    let totalViews = currentChannelVideos.reduce(
      (acc, video) => acc + parseInt(video.views),
      0
    );
    setCurrentChannelView(totalViews);
  }, [currentChannelVideos]);

  return (
    <>
      <h3 className="text-black font-semibold mt-3">Channel Name</h3>
      <p>{channelDetail.channelName}</p>
      <h3 className="text-black font-semibold mt-3">About Channel</h3>
      <p>{channelDetail.channelAbout}</p>
      <div className="sm:flex sm:flex-row">
        {/* Other channel information */}
      </div>
      <h3 className="text-black font-semibold mt-3">Channel Link</h3>
      <Link to={`/channels/${id}`} className="text-sky-600">
        {`https://localhost:5173/channels/${id}`}
      </Link>
      <h3 className="text-black font-semibold mt-3">Email:</h3>
      <Link to={`mailto:${currentChannelUserEmail}`} className="text-sky-600">
        {currentChannelUserEmail}
      </Link>
    </>
  );
}

export default Profile;
