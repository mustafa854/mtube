import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function VideoCard({ video }) {
  const [timePosted, setTimePost] = useState("");
  // const getPublishedDate = () => {
  //   const nowInSeconds = Math.floor(Date.now() / 1000);
  //   var timeUsed = (nowInSeconds - video.publishDate.seconds) / 60;
  //   if (timeUsed < 60) {
  //     setTimePost(String(Math.floor(timeUsed)) + " minutes");
  //   }
  //   var timeUsed = timeUsed / 60;
  //   if (timeUsed < 24) {
  //     setTimePost(String(Math.floor(timeUsed)) + " hours");
  //   }
  //   var timeUsed = timeUsed / 24;
  //   if (timeUsed < 30) {
  //     setTimePost(String(Math.floor(timeUsed)) + " days");
  //   }
  //   var timeUsed = timeUsed / 30;
  //   if (timeUsed < 12) {
  //     setTimePost(String(Math.floor(timeUsed)) + " months");
  //   }
  //   var timeUsed = timeUsed / 12;
  //   setTimePost(String(Math.floor(timeUsed)) + " years");
  // };

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
    <div className="video-card mx-auto">
      <div className="video-card--img">
        <Link to={"/" + video.videosId}>
          <img
            src={video.videoThumbnail}
            className="border rounded-xl	"
            alt=""
          />
        </Link>
      </div>
      <div className="video-card--content flex flex-row pt-4">
        <div style={{ minWidth: "40px" }}>
          <Link to={"/channels/" + video.channel_id}>
            <img
              className="channel-img"
              src={video.channel.channelImage}
              alt=""
            />
          </Link>
        </div>
        <div className="video-details pl-4">
          <Link to={"/" + video.videosId}>
            <h4 className="video-title font-medium leading-6 text-lg">
              {video.title.length > 40
                ? video.title.slice(0, 60) + "..."
                : video.title}
            </h4>
          </Link>
          <div className="pt-1">
            <Link to={"/channels/" + video.channel_id}>
              <p className="channel-name text-sm font-normal text-gray-500">
                {video.channel.channelName}
              </p>
            </Link>
            <Link to={"/" + video.videosId}>
              <div className="video-meta flex flex-row">
                <p className="view-count text-sm font-normal text-gray-500">
                  {video.views} Views
                </p>
                <p className="upload-date text-sm pl-2 font-normal text-gray-500">
                  •
                </p>
                <p className="upload-date text-sm pl-2 font-normal text-gray-500">
                  {timePosted} ago
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
