import { Link } from "react-router-dom";
import "../index.css";
function VideoCard2({ video }) {
  return (
    <>
      <div className="video-card flex flex-row mb-2">
        <div className="video-card--img width-9-20">
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
              <h4 className="video-title font-medium leading-5 text-sm pb-1">
                {video.title.length > 40
                  ? video.title.slice(0, 40) + "..."
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
                <div className="video-meta flex flex-row">
                  <p className="view-count text-xs font-normal text-gray-500">
                    {video.views} Views
                  </p>
                  <p className="upload-date text-xs pl-2 font-normal text-gray-500">
                    •
                  </p>
                  <p className="upload-date text-xs pl-2 font-normal text-gray-500">
                    Upload Date
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
