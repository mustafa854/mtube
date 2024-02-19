// import Banner from "../components/Banner.jsx";
// import VideoCard from "../components/videocard.jsx";
// import { useVideoAndChannel } from "../context/VideoAndChannel.jsx";
// import "../index.css";
// import { useState } from "react";
// import { useEffect } from "react";
// import { updateVideoView } from "../utils/views/updateVideoView.js";
// import Loader from "../components/Loader.jsx";
// function Home() {
//   const { videos, channels } = useVideoAndChannel();
//   const [showBanner, setShowBanner] = useState(
//     JSON.parse(localStorage.getItem("showBanner")) === false ? false : true
//   );
//   const closeBanner = () => {
//     showBanner === true ? setShowBanner(false) : setShowBanner(true);
//   };

//   useEffect(() => {
//     localStorage.setItem("showBanner", JSON.stringify(showBanner));
//   }, [showBanner]);

//   // if (videos.length > 0 && channels.length > 0) {
//   return (
//     <>
//       {showBanner === true ? (
//         <Banner closeBanner={closeBanner} />
//       ) : (
//         <>
//           <div
//             className="lg:container flex flex-row justify-center content-center cursor-pointer"
//             onClick={closeBanner}
//           >
//             <h3 className="">Get Banner back</h3>
//           </div>
//         </>
//       )}
//       <div className="lg:container mx-auto px-4 mt-5 mb-4 flex flex-row justify-between	items-center">
//         <h2 className="text-2xl	 font-bold	">Trending</h2>
//       </div>
//       <div className="lg:container mx-auto video-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4">
//         {videos.length > 0 && channels.length > 0 ? (
//           videos
//             .slice(0, 8)
//             .map((video) => <VideoCard key={video.videosId} video={video} />)
//         ) : (
//           <Loader height={"400px"} />
//         )}
//       </div>
//       <div className="lg:container mx-auto px-4 mt-7 flex mb-4 flex-row justify-between	items-center">
//         <h2 className="text-2xl	 font-bold	">Trending</h2>
//       </div>
//       <div className="lg:container mx-auto video-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4 mb-10">
//         {videos.length > 0 && channels.length > 0 ? (
//           videos.slice(0, 8).map((video) => (
//             <div className="container mx-auto">
//               <VideoCard key={video.videosId} video={video} />
//             </div>
//           ))
//         ) : (
//           <Loader height={"400px"} />
//         )}
//       </div>
//     </>
//   );
//   // } else {
//   //   return;
//   // }
// }
// export default Home;

// Banner Close Function: The closeBanner function can be simplified by toggling the showBanner state directly rather than using a ternary operator.

// Conditional Rendering: You have conditional rendering logic based on the existence of videos and channels. This is good for handling loading states, but you might also want to consider cases where videos or channels are empty arrays or undefined.

// Code Organization: The component's JSX structure is clean and organized, making it easy to read and understand.

// Key Prop: When mapping through the videos array to render VideoCard components, ensure that each VideoCard component has a unique key prop. Currently, you're using video.videosId as the key, which seems appropriate assuming it's unique for each video.

import Banner from "../components/Banner.jsx";
import VideoCard from "../components/videocard.jsx";
import { useVideoAndChannel } from "../context/VideoAndChannel.jsx";
import "../index.css";
import { useState, useEffect } from "react";
import { updateVideoView } from "../utils/views/updateVideoView.js";
import Loader from "../components/Loader.jsx";

function Home() {
  const { videos, channels } = useVideoAndChannel();
  const [showBanner, setShowBanner] = useState(
    JSON.parse(localStorage.getItem("showBanner")) !== false
  );

  const closeBanner = () => {
    setShowBanner(false);
  };

  useEffect(() => {
    localStorage.setItem("showBanner", JSON.stringify(showBanner));
  }, [showBanner]);

  return (
    <>
      {showBanner ? (
        <Banner closeBanner={closeBanner} />
      ) : (
        <div
          className="lg:container flex flex-row justify-center content-center cursor-pointer"
          onClick={closeBanner}
        >
          <h3 className="">Get Banner back</h3>
        </div>
      )}

      <div className="lg:container mx-auto px-4 mt-5 mb-4 flex flex-row justify-between items-center">
        <h2 className="text-2xl font-bold">Trending</h2>
      </div>

      <div className="lg:container mx-auto video-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4">
        {videos.length > 0 && channels.length > 0 ? (
          videos
            .slice(0, 8)
            .map((video) => <VideoCard key={video.videosId} video={video} />)
        ) : (
          <Loader height={"400px"} />
        )}
      </div>

      <div className="lg:container mx-auto px-4 mt-7 flex mb-4 flex-row justify-between items-center">
        <h2 className="text-2xl font-bold">Trending</h2>
      </div>

      <div className="lg:container mx-auto video-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4 mb-10">
        {videos.length > 0 && channels.length > 0 ? (
          videos.slice(0, 8).map((video) => (
            <div className="container mx-auto" key={video.videosId}>
              <VideoCard video={video} />
            </div>
          ))
        ) : (
          <Loader height={"400px"} />
        )}
      </div>
    </>
  );
}

export default Home;
