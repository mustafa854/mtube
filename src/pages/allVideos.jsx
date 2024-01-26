import { useVideoAndChannel } from "../context/VideoAndChannel";
import VideoCard from "../components/videocard";

function AllVideos() {
  const { videos } = useVideoAndChannel();
  return (
    <div className="lg:container mt-8 px-4 flex flex-col mx-auto mb-10">
      <h2 className="font-bold text-4xl">All Videos</h2>
      <div className="lg:container mx-auto video-wrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-6 mb-10">
        {videos.map((video) => (
          <VideoCard key={video.videosId} video={video} />
        ))}
      </div>
    </div>
  );
}

export default AllVideos;
