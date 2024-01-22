import { useEffect, useState } from "react";
import { useLikes } from "../context/Likes";
import { getCurrentUserLikes } from "../utils/getCurrentUserLikes";
import { updateLikeorDislike } from "../utils/updateLikeorDislike";
import { calculateTotalVideoLikes } from "../utils/calculateTotalVideoLikes";
import { auth } from "../config/firebase-config";

function LikeDislikeComponent({
  currentLikeStatus,
  videoId,
  setcurrentLikeStatus,
  message,
  setMessage,
  requestLogin,
}) {
  const { likes, setLikes } = useLikes();
  const [currentVideosLikesCount, setCurrentVideosLikesCount] = useState(0);
  const fetchCurrentVideosLikesCount = async () => {
    const response = await calculateTotalVideoLikes(videoId);
    setCurrentVideosLikesCount(response);
  };
  useEffect(() => {
    fetchCurrentVideosLikesCount();
  }, [videoId]);
  const fetchLikesofCurrentUser = async () => {
    const response = await getCurrentUserLikes();
    setLikes(response);
    console.log("Likes Response", response);
  };
  const clikedonLikeorDislike = async (clickId) => {
    if (currentLikeStatus === "like") {
      if (clickId === "like") {
        updateLikeorDislike(videoId, "");
        setcurrentLikeStatus("");
        await fetchLikesofCurrentUser();
        setCurrentVideosLikesCount(currentVideosLikesCount - 1);
      } else if (clickId === "dislike") {
        updateLikeorDislike(videoId, "dislike");
        setcurrentLikeStatus("dislike");
        await fetchLikesofCurrentUser();
        setCurrentVideosLikesCount(currentVideosLikesCount - 1);
      }
    } else if (currentLikeStatus === "dislike") {
      if (clickId === "dislike") {
        updateLikeorDislike(videoId, "");
        setcurrentLikeStatus("");
        await fetchLikesofCurrentUser();
      } else if (clickId === "like") {
        updateLikeorDislike(videoId, "like");
        setcurrentLikeStatus("like");
        await fetchLikesofCurrentUser();
        setCurrentVideosLikesCount(currentVideosLikesCount + 1);
      }
    } else if (currentLikeStatus === "") {
      if (clickId === "like") {
        updateLikeorDislike(videoId, "like");
        setcurrentLikeStatus("like");
        await fetchLikesofCurrentUser();
        setCurrentVideosLikesCount(currentVideosLikesCount + 1);
      } else if (clickId === "dislike") {
        updateLikeorDislike(videoId, "dislike");
        setcurrentLikeStatus("dislike");
        await fetchLikesofCurrentUser();
      }
    }
  };

  if (auth.currentUser) {
    return (
      <>
        <div
          className="container flex flex-row p-1 px-2 rounded-full"
          style={{ backgroundColor: "hsla(0,0%,93.3%,0.8)" }}
        >
          <div
            className="container flex flex-row gap-1 border-r pr-4 cursor-pointer"
            onClick={() => clikedonLikeorDislike("like")}
          >
            <div className="icon">
              {currentLikeStatus === "like" ? (
                <>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2M20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#000000"
                      d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2M4 10h2v9H4zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7z"
                    />
                  </svg>
                </>
              )}
            </div>
            <div className="icon-count my-auto">{currentVideosLikesCount}</div>
          </div>
          <div
            className="container flex flex-row cursor-pointer"
            onClick={() => clikedonLikeorDislike("dislike")}
          >
            <div className="icon border-l pl-3">
              {currentLikeStatus === "dislike" ? (
                <>
                  <svg
                    className="rotate-180"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2M20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <svg
                    className="rotate-180"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#000000"
                      d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2M4 10h2v9H4zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7z"
                    />
                  </svg>
                </>
              )}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className="container flex flex-row p-1 px-2 rounded-full"
          style={{ backgroundColor: "hsla(0,0%,93.3%,0.8)" }}
        >
          <div
            className="container flex flex-row gap-1 border-r pr-4 cursor-pointer"
            onClick={() => requestLogin("a")}
          >
            <div className="icon">
              <>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#000000"
                    d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2M4 10h2v9H4zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7z"
                  />
                </svg>
              </>
            </div>
            <div className="icon-count my-auto">{currentVideosLikesCount}</div>
          </div>
          <div
            className="container flex flex-row cursor-pointer"
            onClick={() => requestLogin("a")}
          >
            <div className="icon border-l pl-3">
              <>
                <svg
                  className="rotate-180"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#000000"
                    d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2M4 10h2v9H4zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7z"
                  />
                </svg>
              </>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LikeDislikeComponent;
