import { Link } from "react-router-dom";
import "../index.css";

function VideoCard({ video }) {
  console.log("date", (Date.now() - video.publishDate) / (86400000 * 30 * 30));
  return (
    <Link to={video.id} className="flex-child-item-25">
      <div className="video-card">
        <div className="video-card--img">
          <img
            src={video.videoThumbnail}
            className="border rounded-xl	"
            alt=""
          />
        </div>
        <div className="video-card--content flex flex-row pt-4">
          <div>
            <img className="channel-img" src={video.channelImage} alt="" />
          </div>
          <div className="video-details pl-4">
            <h4 className="video-title font-medium leading-6 text-lg">
              {video.title.length > 40
                ? video.title.slice(0, 40) + "..."
                : video.title}
            </h4>
            <div className="pt-1">
              <p className="channel-name text-sm font-normal text-gray-500">
                {video.channelName}
              </p>
              <div className="video-meta flex flex-row">
                <p className="view-count text-sm font-normal text-gray-500">
                  {video.views} Views
                </p>
                <p className="upload-date text-sm pl-2 font-normal text-gray-500">
                  •
                </p>
                <p className="upload-date text-sm pl-2 font-normal text-gray-500">
                  {}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
