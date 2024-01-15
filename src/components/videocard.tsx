import { Link } from "react-router-dom";

function VideoCard({ video }) {
  return (
    <div className="video-card">
      <div className="video-card--img">
        <Link to={"/" + video.id}>
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
          <Link to={"/" + video.id}>
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
            <Link to={"/" + video.id}>
              <div className="video-meta flex flex-row">
                <p className="view-count text-sm font-normal text-gray-500">
                  {video.views} Views
                </p>
                <p className="upload-date text-sm pl-2 font-normal text-gray-500">
                  •
                </p>
                <p className="upload-date text-sm pl-2 font-normal text-gray-500">
                  Upload Date
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
