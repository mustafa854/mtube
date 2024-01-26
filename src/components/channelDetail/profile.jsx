import { useEffect, useState } from "react";
import { useUser } from "../../context/User";
import { currentChannelMeta } from "../../utils/currentChannelMeta";
import { Link } from "react-router-dom";

function Profile({ id, currentChannelVideos, channelDetail, setCurrentId }) {
  const [currentChannelUserEmail, setCurrentChannelUserEmail] = useState([]);
  const [currentChannelView, setCurrentChannelView] = useState("");
  const getCurrentChannelViews = () => {
    let views = 0;
    let i = 0;
    while (i < currentChannelVideos?.length) {
      views = Number(currentChannelVideos[i].views) + views;
      i = i + 1;
    }
    setCurrentChannelView(String(views));
  };
  const fetchChannelMeta = async () => {
    const response = await currentChannelMeta(id);
    setCurrentChannelUserEmail(response);
  };
  useEffect(() => {
    fetchChannelMeta();
    getCurrentChannelViews();
  }, [id]);
  return (
    <>
      <h3 className="text-black  font-semibold mt-3">Channel Name</h3>
      <p>{channelDetail.channelName}</p>
      <h3 className="text-black  font-semibold mt-3">About Channel</h3>
      <p>{channelDetail.channelAbout}</p>
      <div className="sm:flex sm:flex-row">
        <div className="container">
          <h3 className="text-black  font-semibold mt-3">Total Subscribers</h3>
          <p>{channelDetail.Subscribers} Subscribers</p>
        </div>
        <div className="container">
          <h3 className="text-black  font-semibold mt-3">Total Views</h3>
          <p>
            {currentChannelView === "" ? "Loading Views!" : currentChannelView}{" "}
            Views
          </p>
        </div>
        <div className="container">
          <h3 className="text-black  font-semibold mt-3">Total videos</h3>
          <p>
            {channelDetail.videos?.length ? channelDetail.videos?.length : 0}{" "}
            Videos
          </p>
        </div>
        <div className="container">
          <h3 className="text-black  font-semibold mt-3">Joined Date</h3>
          <p>
            {typeof channelDetail.createdAt === "string"
              ? channelDetail.createdAt
              : ""}
          </p>
        </div>
      </div>
      <h3 className="text-black  font-semibold mt-3">Channel Link</h3>
      <Link to={"/channels/" + id}>
        <p className="text-sky-600">
          {"https://localhost:5173/channels/" + id}
        </p>
      </Link>
      <h3 className="text-black  font-semibold mt-3">Email:</h3>
      <Link to={"mailto:" + currentChannelUserEmail}>
        <p className="text-sky-600">{currentChannelUserEmail}</p>
      </Link>
    </>
  );
}

export default Profile;
