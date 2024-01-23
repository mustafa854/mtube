import Banner from "../components/Banner.jsx";
import VideoCard from "../components/videocard.jsx";
import { useVideoAndChannel } from "../context/VideoAndChannel.jsx";
import "../index.css";
import { useState } from "react";
import { useEffect } from "react";
import { updateVideoView } from "../utils/views/updateVideoView.js";
function Home() {
  const { videos, channels } = useVideoAndChannel();
  const [showBanner, setShowBanner] = useState(
    JSON.parse(localStorage.getItem("showBanner")) === false ? false : true
  );
  const closeBanner = () => {
    showBanner === true ? setShowBanner(false) : setShowBanner(true);
  };

  useEffect(() => {
    localStorage.setItem("showBanner", JSON.stringify(showBanner));
  }, [showBanner]);

  if (videos && channels) {
    return (
      <>
        {showBanner === true ? (
          <Banner closeBanner={closeBanner} />
        ) : (
          <>
            <div
              className="container flex flex-row justify-center content-center cursor-pointer"
              onClick={closeBanner}
            >
              <h3 className="">Get Banner back</h3>
            </div>
          </>
        )}
        <div className="container mx-auto px-4 mt-5 mb-4 flex flex-row justify-between	items-center">
          <h2 className="text-2xl	 font-bold	">Trending</h2>
        </div>
        <div className="video-wrapper grid grid-cols-4 gap-3 px-4">
          {videos.slice(0, 8).map((video) => (
            <VideoCard key={video.videosId} video={video} />
          ))}
        </div>
        <div className="container mx-auto px-4 mt-7 flex mb-4 flex-row justify-between	items-center">
          <h2 className="text-2xl	 font-bold	">Trending</h2>
        </div>
        <div className="video-wrapper grid grid-cols-4 gap-3 px-4 mb-10">
          {videos.slice(0, 8).map((video) => (
            <VideoCard key={video.videosId} video={video} />
          ))}
        </div>
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
}
export default Home;
