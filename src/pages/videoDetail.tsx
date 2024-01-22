import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VideoCard2 from "../components/videoCard2";
import { Link } from "react-router-dom";
import { currentVideoDetail } from "../services/firebase";
import { useVideoAndChannel } from "../context/VideoAndChannel";
import LikeDislikeComponent from "../components/likeDislikeComponent";
import { useLikes } from "../context/Likes";
import { getCurrentUserLikes } from "../utils/getCurrentUserLikes";
import Comments from "../components/Comments";

function VideoDetails() {
  const { id } = useParams();
  const [currentId, setCurrentId] = useState(id);
  const [videoDetail, setVideoDetail] = useState({});
  const { videos } = useVideoAndChannel();
  const [timePosted, setTimePost] = useState("");
  const [datePostedStrFormat, setDatePostedStrFormat] = useState("");
  const { likes, setLikes } = useLikes();
  const [currentLikeStatus, setcurrentLikeStatus] = useState("");
  const [message, setMessage] = useState("");
  const getCurrentLiked = async () => {
    likes.filter((like) => {
      if (like.VideoId === id) {
        setcurrentLikeStatus(like.likeOrDislike);
      }
    });
  };
  const requestLogin = (key) => {
    if (key === "r") {
      setMessage("");
    } else if (key === "a") {
      setMessage("Please Login to Like or Dislike");
    }
  };
  useEffect(() => {
    setCurrentId(id);
    setcurrentLikeStatus("");
  }, [id]);
  useEffect(() => {
    getCurrentLiked();
  }, [likes]);
  // const getPublishedDate = () => {
  //   const nowInSeconds = Math.floor(Date.now() / 1000);
  //   let timeUsed = nowInSeconds - videoDetail.publishDate.seconds;
  //   if (timeUsed < 60) {
  //     setTimePost(String(Math.floor(timeUsed)) + " seconds");
  //   } else if (timeUsed < 60 * 60) {
  //     setTimePost(String(Math.floor(timeUsed / 60)) + " minutes");
  //   } else if (timeUsed < 60 * 60 * 24) {
  //     setTimePost(String(Math.floor(timeUsed / (60 * 60))) + " hours");
  //   } else if (timeUsed < 60 * 60 * 24 * 30) {
  //     setTimePost(String(Math.floor(timeUsed / (60 * 60 * 24))) + " days");
  //   } else if (timeUsed < 60 * 60 * 24 * 30 * 12) {
  //     setTimePost(
  //       String(Math.floor(timeUsed / (60 * 60 * 24 * 30))) + " months"
  //     );
  //   } else {
  //     setTimePost(
  //       String(Math.floor(timeUsed / (60 * 60 * 24 * 30 * 12))) + " years"
  //     );
  //   }
  // };
  const getDatePostedStrFormat = () => {
    const jsDate = videoDetail.publishDate.toDate();
    let day = jsDate.getDate();
    let month = jsDate.toLocaleString("default", { month: "long" });
    let year = jsDate.getFullYear();
    let formattedDate = `${day} ${month} ${year}`;

    setDatePostedStrFormat(formattedDate);
  };
  const fetchVideoDetail = async () => {
    if (typeof id === "string") {
      const response = await currentVideoDetail(id);
      setVideoDetail(response);
      // getPublishedDate();
      // getDatePostedStrFormat();
    } else {
      setVideoDetail({ error: "Video Doesn't exists" });
    }
  };

  useEffect(() => {
    fetchVideoDetail();
    getCurrentLiked();
    // getPublishedDate();
  }, [currentId]);

  if (videoDetail.videosId) {
    return (
      <>
        <div className="container w-5/6 flex flex-row mx-auto mb-10">
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
              {message !== "" ? (
                <>
                  <div className="flex flex-row">
                    <p className="my-auto">{message}</p>
                    <button
                      className="my-auto"
                      onClick={() => requestLogin("r")}
                    >
                      <svg
                        className="my-auto"
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                <p>{message}</p>
              )}
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
                    <h3 className="text-xs font-light">
                      {videoDetail.channel.subscribers} Subscribers
                    </h3>
                  </div>
                </Link>
                <button
                  type="button"
                  className="hover:bg-slate-800 bg-black text-white p-2 px-4 ml-5 rounded-full"
                >
                  Subscribe
                </button>
                <div className="my-auto ms-auto">
                  <LikeDislikeComponent
                    currentLikeStatus={currentLikeStatus}
                    videoId={id}
                    setcurrentLikeStatus={setcurrentLikeStatus}
                    message={message}
                    setMessage={setMessage}
                    requestLogin={requestLogin}
                  />
                </div>
              </div>

              <div
                className="mt-4 p-3 rounded-xl"
                style={{ backgroundColor: "hsla(0,0%,93.3%,0.8)" }}
              >
                <p className="text-sm font-medium">
                  {videoDetail.views} Views&nbsp;&nbsp;
                  {timePosted ? timePosted + " ago" : <></>}&nbsp;&nbsp;
                  {datePostedStrFormat}
                  &nbsp;&nbsp;&nbsp;
                  <span className="text-zinc-400">
                    #HASHTAGS #HASHTAGS #HASHTAGS
                  </span>
                </p>
                <p className="text-sm mt-2">{videoDetail.description}</p>
              </div>
              <div className="container mt-5">
                <Comments id={id} />
              </div>
            </div>
          </div>
          <div className="w-1/4">
            {videos.map((video) =>
              video.videosId !== currentId ? (
                <VideoCard2 video={video} key={video.videosId} />
              ) : (
                ""
              )
            )}
          </div>
        </div>
      </>
    );
  } else if (videoDetail.error) {
    return <h1>404 Error</h1>;
  } else if (id == undefined) {
    return <h1>404 Error</h1>;
  } else {
    return <h1>Loading</h1>;
  }
}
export default VideoDetails;
