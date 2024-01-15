import Banner from "../components/Banner.tsx";
import VideoCard from "../components/videocard.tsx";
import "../index.css";

function Home({ videos }) {
  return (
    <>
      <Banner />
      <div className="container mx-auto px-4 mt-5 mb-4 flex flex-row justify-between	items-center">
        <h2 className="text-2xl	 font-bold	">Trending</h2>
      </div>
      <div className="video-wrapper grid grid-cols-4 gap-3 px-4">
        {videos.slice(0, 6).map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
      <div className="container mx-auto px-4 mt-7 flex mb-4 flex-row justify-between	items-center">
        <h2 className="text-2xl	 font-bold	">Trending</h2>
      </div>
      <div className="video-wrapper grid grid-cols-4 gap-3 px-4 mb-10">
        {videos.slice(0, 6).map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </>
  );
}

export default Home;
