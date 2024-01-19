import { useVideoAndChannel } from "../context/VideoAndChannel";
import VideoCard from "../components/videocard";

function AllVideos() {
  const { videos } = useVideoAndChannel();
  return (
    <div className="container mt-2 w-5/6 flex flex-col mx-auto mb-10">
      <h2 className="font-bold text-4xl">All Videos</h2>
      <div className="mt-4 video-wrapper grid grid-cols-3 gap-3 ">
        {videos.map((video) => (
          <VideoCard key={video.videosId} video={video} />
        ))}
      </div>
    </div>
  );
}

export default AllVideos;
