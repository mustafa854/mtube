import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VideoCard2 from "../components/videoCard2";

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
                  <img
                    src={videoDetail.channelImage}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "500px",
                    }}
                    alt=""
                  />
                </div>
                <div
                  className="flex flex-col justify-center items-start ml-2"
                  style={{
                    maxHeight: "40px",
                  }}
                >
                  <h3 className="text-base font-medium">
                    {videoDetail.channelName}
                  </h3>
                  <h3 className="text-xs font-light">153k Subscribers</h3>
                </div>
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
