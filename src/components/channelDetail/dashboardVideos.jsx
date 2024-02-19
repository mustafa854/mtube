// import { Link } from "react-router-dom";
// import VideoCard from "../videocard";
// function DashboardVideos({ id, currentChannelVideos }) {
//   if (currentChannelVideos.length < 1) {
//     return <h1 className="mt-10 mb-10">No Videos Uploaded by the User</h1>;
//   } else {
//     return (
//       <>
//         <div className="container">
//           <div className="video-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6 mb-5">
//             {currentChannelVideos.map((video) => (
//               <VideoCard key={video.videosId} video={video} />
//             ))}
//           </div>
//         </div>
//       </>
//     );
//   }
// }

// export default DashboardVideos;

// The provided code for the DashboardVideos component looks clean and efficient. However, we can make some minor improvements for readability and consistency:

// Consistent Naming: The component imports VideoCard from "../videocard", but in the mapping function, it's referenced as VideoCard. Ensure consistency in naming conventions to avoid confusion.

// Use of Fragment Shorthand: Instead of <></>, you can use the shorthand <> syntax for fragments for better readability.

import { Link } from "react-router-dom";
import VideoCard from "../videocard";

function DashboardVideos({ id, currentChannelVideos }) {
  if (currentChannelVideos.length < 1) {
    return <h1 className="mt-10 mb-10">No Videos Uploaded by the User</h1>;
  } else {
    return (
      <div className="container">
        <div className="video-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6 mb-5">
          {currentChannelVideos.map((video) => (
            <VideoCard key={video.videosId} video={video} />
          ))}
        </div>
      </div>
    );
  }
}

export default DashboardVideos;
