import { Link } from "react-router-dom";
import "../index.css";
import { useEffect, useState } from "react";
function VideoCard2({ video }) {
  const [timePosted, setTimePost] = useState("");

  const getPublishedDate = () => {
    const nowInSeconds = Math.floor(Date.now() / 1000);
    let timeUsed = nowInSeconds - video.publishDate.seconds;
    if (timeUsed < 60) {
      setTimePost(String(Math.floor(timeUsed)) + " seconds");
    } else if (timeUsed < 60 * 60) {
      setTimePost(String(Math.floor(timeUsed / 60)) + " minutes");
    } else if (timeUsed < 60 * 60 * 24) {
      setTimePost(String(Math.floor(timeUsed / (60 * 60))) + " hours");
    } else if (timeUsed < 60 * 60 * 24 * 30) {
      setTimePost(String(Math.floor(timeUsed / (60 * 60 * 24))) + " days");
    } else if (timeUsed < 60 * 60 * 24 * 30 * 12) {
      setTimePost(
        String(Math.floor(timeUsed / (60 * 60 * 24 * 30))) + " months"
      );
    } else {
      setTimePost(
        String(Math.floor(timeUsed / (60 * 60 * 24 * 30 * 12))) + " years"
      );
    }
  };

  useEffect(() => {
    getPublishedDate();
  }, []);
  return (
    <>
      <div className="video-card flex flex-row mb-2">
        <div className="video-card--img width-9-20 my-auto">
          <Link to={"/" + video.videosId}>
            <img
              src={video.videoThumbnail}
              className="border rounded-lg w-full"
              alt=""
            />
          </Link>
        </div>
        <div className="video-card--content flex flex-row width-11-20 pl-2">
          <div className="video-details">
            <Link to={"/" + video.videosId}>
              <h4 className="video-title lg:max-xl:hidden  font-medium leading-5 text-sm pb-1">
                {video.title.length > 40
                  ? video.title.slice(0, 40) + "..."
                  : video.title}
              </h4>
              <h4 className="hidden lg:max-xl:block video-title font-medium leading-5 text-sm pb-1">
                {video.title.length > 25
                  ? video.title.slice(0, 25) + "..."
                  : video.title}
              </h4>
            </Link>
            <div>
              <Link to={"/channels/" + video.channel_id}>
                <p className="channel-name text-xs font-normal text-gray-500">
                  {video.channel.channelName}
                </p>
              </Link>
              <Link to={"/" + video.videosId}>
                <div className="video-meta xl:flex xl:flex-row">
                  <p className="view-count text-xs font-normal text-gray-500">
                    {video.views} Views
                  </p>
                  <p className="upload-date text-xs pl-2 font-normal text-gray-500 hidden xl:block">
                    •
                  </p>
                  <p className="upload-date text-xs xl:pl-2 lg:max-xl:hidden font-normal text-gray-500">
                    {timePosted} ago
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoCard2;
