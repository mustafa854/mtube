import "./styles/videoCard.css";
import "./App.css";
import Header from "./components/Header.jsx";
import "/src/styles/header.css";
import { useEffect, useRef, useState } from "react";
import { getChannelLink } from "./utils/getChannelLink.js";
import {
  getVideos,
  getChannels,
  userAccountDetails,
} from "./services/firebase.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import VideoDetails from "./pages/videoDetail.jsx";
import NotFound from "./pages/notFound.jsx";
import ChannelList from "./pages/channelsList.jsx";
import UserProfile from "./pages/userProfile.jsx";
import { auth } from "./config/firebase-config.js";
import { useUser } from "./context/User.jsx";
import { useVideoAndChannel } from "./context/VideoAndChannel.jsx";
import ChannelsDetail from "./pages/channelsDetail.jsx";
import CreateChannel from "./pages/createChannel.jsx";
import { getCurrentUserLikes } from "./utils/getCurrentUserLikes.js";
import { useLikes } from "./context/Likes.jsx";
import SearchResult from "./components/search/searchResults.jsx";
import AllVideos from "./pages/allVideos.jsx";

function App() {
  const { setMyChannelLink, setUserDetails } = useUser();
  const { setVideos, setChannels } = useVideoAndChannel();
  const { likes, setLikes } = useLikes();

  const fetchIsChannelCreated = async () => {
    const response = await getChannelLink();
    setMyChannelLink(response);
  };
  const fetchUserDetails = async () => {
    const response = await userAccountDetails();
    setUserDetails(response);
  };
  const fetchLikesofCurrentUser = async () => {
    const response = await getCurrentUserLikes();
    setLikes(response);
  };

  useEffect(() => {
    if (auth.currentUser) {
      fetchIsChannelCreated();
      fetchUserDetails();
      fetchLikesofCurrentUser();
    }
  }, [auth.currentUser]);

  const fetchChannels = async () => {
    const response = await getChannels();
    response.forEach((element) => {
      setChannels((prevArray) => [...prevArray, element.data()]);
    });
  };
  const fetchVideos = async () => {
    const response = await getVideos();
    response.forEach((element) => {
      setVideos((prevArray) => [...prevArray, element.data()]);
    });
  };

  const shouldFetch = useRef(true);

  useEffect(() => {
    fetchLikesofCurrentUser();
    if (shouldFetch.current) {
      shouldFetch.current = false;

      fetchChannels();
      fetchVideos();
    }
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/:id" element={<VideoDetails />} />
        <Route path="channels" element={<ChannelList />} />
        <Route path="videos" element={<AllVideos />} />
        <Route path="results" element={<SearchResult />} />
        <Route path="my-account" element={<UserProfile />} />
        <Route path="/create-channels/" element={<CreateChannel />} />
        <Route path="/channels/:id/*" element={<ChannelsDetail />} />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
