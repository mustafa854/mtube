import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCurrentChannel, getChannelVideos } from "../services/firebase.ts";
import VideoCard from "../components/videocard";

function EditProfile({ channels }) {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState();
  const [currentChannelVideos, setCurrentChannelVideos] = useState([]);
  useEffect(() => {
    if (channels) {
      let channelFound = channels.find((channel) => channel.id === id);
      if (channelFound) {
        setChannelDetail(channelFound);
      } else {
        let currentChannel = getCurrentChannel(id);
        if (currentChannel !== false) {
          setChannelDetail(currentChannel);
        } else {
          setChannelDetail(false);
        }
      }
    } else {
      let currentChannel = getCurrentChannel(id);
      if (currentChannel !== false) {
        setChannelDetail(currentChannel);
      } else {
        setChannelDetail(false);
      }
    }
  }, [id, channels]);

  useEffect(() => {
    if (channelDetail) {
      getChannelVideos(id).then((channelVideos) =>
        setCurrentChannelVideos(channelVideos)
      );
    }
    console.log(currentChannelVideos);
  }, [channelDetail]);
  // console.log(channelDetail);

  if (channelDetail == false) {
    return <h1>Loading</h1>;
  } else if (!channelDetail) {
    return <h1>Loading</h1>;
  } else {
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
                @channelDetail?.id • {channelDetail?.Subscribers} subscribers •
                {channelDetail?.videos
                  ? " " + channelDetail.videos.length + " Videos"
                  : " 0 Video"}
              </p>

              <p className="text-sm text-neutral-500	">
                {/* {channelDetail?.channelAbout.length > 30
                  ? channelDetail.channelAbout.slice(0, 100) + "..."
                  : channelDetail.channelAbout} */}
                {channelDetail.channelAbout}
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
            <Link to={"/channels/" + id}>Videos</Link>
            <Link to={"/channels/" + id + "/upload"}>Upload Videos</Link>
            <Link
              to={"/channels/" + id + "/edit_profile"}
              className="text-black  font-semibold border-b-4 pb-3 border-black"
            >
              Edit Profile
            </Link>
            <Link to={"/channels/" + id + "/profile"} className="">
              Profile
            </Link>
          </div>

          <div className="container">
            {/* <div className="video-wrapper grid grid-cols-3 gap-3 mt-6 mb-5">
              {currentChannelVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div> */}
            <p className="mt-3">
              Edit Profile form goes here with validation and authentication
              checking
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default EditProfile;
