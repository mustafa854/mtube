import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VideoCard2 from "../components/videoCard2";
import { Link } from "react-router-dom";
import { currentVideoDetail } from "../services/firebase";
import { useVideoAndChannel } from "../context/VideoAndChannel";
import LikeDislikeComponent from "../components/likeDislikeComponent";
import { useLikes } from "../context/Likes";
import Comments from "../components/Comments";
import { getCommentReply } from "../utils/comments/commentReply/getCommentReply";
import { updateVideoView } from "../utils/views/updateVideoView";
import Loader from "../components/Loader";

function VideoDetails() {
  const { id } = useParams();
  const [currentId, setCurrentId] = useState(id);
  const [videoDetail, setVideoDetail] = useState({});
  const { videos, setVideos } = useVideoAndChannel();
  const [timePosted, setTimePost] = useState("");
  const [datePostedStrFormat, setDatePostedStrFormat] = useState("");
  const { likes, setLikes } = useLikes();
  const [currentLikeStatus, setcurrentLikeStatus] = useState("");
  const [message, setMessage] = useState("");
  const [newView, setNewView] = useState(undefined);

  const updateViews = async () => {
    const viewsResponse = await updateVideoView(id);
    setVideos((prevArray) =>
      prevArray.map((element) =>
        element.videosId === id ? { ...element, views: viewsResponse } : element
      )
    );
    setNewView(viewsResponse);
  };
  useEffect(() => {
    updateViews();
  }, []);

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
    updateViews();
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
  const [downloading, setDownloading] = useState(false);

  const onDownload = async () => {
    const videoIdRaw = videoDetail.videoLink;
    const match = videoIdRaw.match(/embed\/(.*?)\?/);
    const videoUrl = match[1];
    try {
      setDownloading(true);
      const response = await fetch(
        `http://localhost:3000/download?url=${videoUrl}`
      );
      if (response.ok) {
        // If the download is successful, redirect the user back to the React app
        window.location.href = "/"; // Redirect to the homepage or any other route
      } else {
        console.error("Error downloading video:", response.statusText);
      }
    } catch (error) {
      console.error("Error downloading video:", error.message);
    } finally {
      setDownloading(false);
    }
  };
  if (videoDetail.videosId) {
    return (
      <>
        <div className="xl:container px-4 mt-4 lg:mt-0 lg:px-0 lg:w-5/6 lg:flex lg:flex-row mx-auto lg:mb-10">
          <div className="md:w-3/4 sm:mx-auto lg:mr-4">
            <div className="mx-auto max-853">
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
              <div className="flex sm:flex-row mt-2 flex-col gap-4">
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

                <div className="sm:ms-auto w-1/3 sm:w-fit">
                  <div className="my-auto ">
                    <button onClick={onDownload}>Download</button>
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
              </div>

              <div
                className="mt-4 p-3 rounded-xl"
                style={{ backgroundColor: "hsla(0,0%,93.3%,0.8)" }}
              >
                <p className="text-sm font-medium">
                  {videoDetail.views + 1} Views&nbsp;&nbsp;
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
          <div className="md:w-3/4 lg:w-1/4 sm:mx-auto sm:grid sm:grid-cols-2 lg:grid-cols-1">
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
    return <Loader height={"70vh"} />;
  }
}
export default VideoDetails;
