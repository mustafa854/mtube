import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCurrentChannel, getChannelVideos } from "../services/firebase.ts";
import VideoCard from "../components/videocard";
import { currentChannelDetail } from "./../services/firebase";
import { useVideoAndChannel } from "./../context/VideoAndChannel";

function ChannelsDetail() {
  const { id } = useParams();
  const [currentId, setCurrentId] = useState(id);
  const [channelDetail, setChannelDetail] = useState({});
  const [currentChannelVideos, setCurrentChannelVideos] = useState([]);
  const { channels } = useVideoAndChannel();
  useEffect(() => {
    setCurrentId(id);
  }, [id]);

  const fetchChannelDetail = async () => {
    if (typeof id === "string") {
      const channelResponse = await currentChannelDetail(id);
      setChannelDetail(channelResponse);
      const videoResponse = await getChannelVideos(id);
      setCurrentChannelVideos(videoResponse);
    } else {
      setChannelDetail({ error: "Video Doesn't exists" });
    }
  };

  useEffect(() => {
    fetchChannelDetail();
  }, [currentId]);

  if (channelDetail.channelsId) {
    return (
      <>
        <div className="container mt-2 w-5/6 flex flex-col mx-auto">
          <div className="container h-64">
            <img
              src={channelDetail.channelCover}
              className="rounded-2xl h-full w-full object-cover"
              alt=""
            />
          </div>
          <div className="container flex flex-row mt-8 ">
            <div className="" style={{ height: "160px", width: "160px" }}>
              <img
                src={channelDetail.channelImage}
                className=" rounded-full w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-4 ml-6 ">
              <h2 className="font-bold text-4xl">
                {channelDetail.channelName}
              </h2>
              <p className="text-sm text-neutral-500">
                @channelid • {channelDetail?.Subscribers} subscribers •
                {channelDetail?.videos
                  ? " " + channelDetail.videos.length + " Videos"
                  : " 0 Video"}
              </p>

              <p className="text-sm text-neutral-500	">
                {channelDetail.channelAbout?.length > 30
                  ? channelDetail.channelAbout.slice(0, 100) + "..."
                  : channelDetail.channelAbout}
                {/* {channelDetail.channelAbout} */}
              </p>
              <button
                type="button"
                className="hover:bg-slate-800 bg-black text-white p-2 rounded-full px-4 mr-auto"
              >
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex flex-row gap-5 mt-5 text-neutral-700 border-b-2">
            <Link
              to={"/channels/" + id}
              className="text-black  font-semibold border-b-4 pb-3 border-black"
            >
              Videos
            </Link>
            <Link to={"/channels/" + id + "/upload"}>Upload Videos</Link>
            <Link to={"/channels/" + id + "/edit_profile"}>Edit Profile</Link>
            <Link to={"/channels/" + id + "/profile"}>Profile</Link>
          </div>

          <div className="container">
            <div className="video-wrapper grid grid-cols-3 gap-3 mt-6 mb-5">
              {currentChannelVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  } else if (channelDetail.error) {
    return <h1>404 Error</h1>;
  } else if (id == undefined) {
    return <h1>404 Error</h1>;
  } else {
    return <h1>Loading</h1>;
  }
}

export default ChannelsDetail;
