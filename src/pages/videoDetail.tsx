import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VideoCard2 from "../components/videoCard2";
import { Link } from "react-router-dom";

function VideoDetails({ videos }) {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState();

  useEffect(() => {
    let data = videos.filter((video) => video.id === id);
    setVideoDetail(data[0]);
  }, [id, videos]);

  if (videoDetail) {
    console.log(videoDetail);
    return (
      <>
        <div className="container w-5/6 flex flex-row mx-auto">
          <div className="w-3/4">
            <div style={{ maxWidth: "853px" }} className="mx-auto">
              <iframe
                width="100%"
                height="480"
                src={videoDetail.videoLink}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-xl mx-auto"
              ></iframe>
              <h2 className="text-xl font-bold leading-7 mt-3">
                {videoDetail.title}
              </h2>
              <div className="flex flex-row mt-2">
                <div>
                  <Link to={"/channels/" + videoDetail.channel_id}>
                    <img
                      src={videoDetail.channel.channelImage}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "500px",
                        objectFit: "cover",
                      }}
                      alt=""
                    />
                  </Link>
                </div>
                <Link to={"/channels/" + videoDetail.channel_id}>
                  <div
                    className="flex flex-col justify-center items-start ml-2"
                    style={{
                      maxHeight: "40px",
                    }}
                  >
                    <h3 className="text-base font-medium">
                      {videoDetail.channel.channelName}
                    </h3>
                    <h3 className="text-xs font-light">153k Subscribers</h3>
                  </div>
                </Link>
                <button
                  type="button"
                  className="hover:bg-slate-800 bg-black text-white p-2 px-4 ml-5 rounded-full"
                >
                  Subscribe
                </button>
              </div>

              <div
                className="mt-4 p-3 rounded-xl"
                style={{ backgroundColor: "hsla(0,0%,93.3%,0.8)" }}
              >
                <p className="text-sm font-medium">
                  {videoDetail.views} Views&nbsp;&nbsp;&nbsp;Publish
                  Date&nbsp;&nbsp;&nbsp;
                  <span className="text-zinc-400">
                    #HASHTAGS #HASHTAGS #HASHTAGS
                  </span>
                </p>
                <p className="text-sm mt-2">{videoDetail.description}</p>
              </div>
            </div>
          </div>
          <div className="w-1/4">
            {videos.map((video) => (
              <VideoCard2 video={video} />
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
}
export default VideoDetails;
