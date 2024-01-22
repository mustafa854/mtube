import { useState } from "react";
import { useUser } from "../../context/User";
import { auth } from "../../config/firebase-config";
import { Link } from "react-router-dom";
import { createVideo } from "../../utils/createVideo";

function UploadVideos({ id, currentChannelVideos, setCurrentChannelVideos }) {
  const { myChannelLink, setVideos } = useUser();
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [videoThumbnail, setVideoThumbnail] = useState("");
  const submitForm = async (e) => {
    e.preventDefault();
    const response = await createVideo(
      videoTitle,
      videoDescription,
      videoLink,
      videoThumbnail,
      myChannelLink
    );

    setCurrentChannelVideos((prevVideo) => [...prevVideo, response]);
    setVideos((prevVideo) => [...prevVideo, response]);
    setVideoLink("");
    setVideoDescription("");
    setVideoTitle("");
    setVideoThumbnail("");
  };

  if (auth.currentUser) {
    if (myChannelLink !== "") {
      if (myChannelLink !== id) {
        return (
          <h1>
            Please Upload at your channel by clicking{" "}
            <Link
              to={"/channels/" + myChannelLink + "/upload"}
              className="text-sky-600"
            >
              Here
            </Link>
          </h1>
        );
      } else {
        return (
          <div className="container">
            <div className="w-full mx-auto mt-10" style={{ maxWidth: "600px" }}>
              <form
                className="bg-white border-2 rounded-xl px-8 py-6 pb-8 mb-4"
                onSubmit={submitForm}
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="videoTitle"
                  >
                    Video Title
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="videoTitle"
                    type="text"
                    placeholder="Enter Video Title here..."
                    onChange={(e) => setVideoTitle(e.target.value)}
                    value={videoTitle}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="videoDescription"
                  >
                    Video Description
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="videoDescription"
                    type="text"
                    placeholder="Enter Video Description here..."
                    onChange={(e) => setVideoDescription(e.target.value)}
                    value={videoDescription}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="videoLink"
                  >
                    Video Link
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="videoLink"
                    type="text"
                    placeholder="Enter Video Link here..."
                    onChange={(e) => setVideoLink(e.target.value)}
                    value={videoLink}
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="videoThumbnail"
                  >
                    Video Thumbnail
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="videoThumbnail"
                    type="text"
                    placeholder="Enter Video Thumbnail Link here..."
                    onChange={(e) => setVideoThumbnail(e.target.value)}
                    value={videoThumbnail}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mx-auto px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Upload Video
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      }
    } else {
      return (
        <h1>
          Please create a channel and upload there! You can't upload here.
        </h1>
      );
    }
  } else {
    return <h1>Please Login to Upload</h1>;
  }
}

export default UploadVideos;
