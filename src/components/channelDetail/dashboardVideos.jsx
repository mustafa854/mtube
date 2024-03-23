import { Link } from "react-router-dom";
import VideoCard from "../videocard";
function DashboardVideos({ id, currentChannelVideos }) {
  if (currentChannelVideos.length < 1) {
    return <h1 className="mt-10 mb-10">No Videos Uploaded by the User</h1>;
  } else {
    return (
      <>
        <div className="container">
          <div className="video-wrapper grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6 mb-5">
            {currentChannelVideos.map((video) => (
              <VideoCard key={video.videosId} video={video} />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default DashboardVideos;
