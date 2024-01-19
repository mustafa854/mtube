import "./styles/videoCard.css";
import "./App.css";
import Header from "./components/Header.tsx";
import "/src/styles/header.css";
import { useEffect, useRef, useState } from "react";
import { getChannelLink } from "./utils/getChannelLink.ts";
import {
  getVideos,
  getChannels,
  userAccountDetails,
} from "./services/firebase.ts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import VideoDetails from "./pages/videoDetail";
import NotFound from "./pages/notFound";
import ChannelList from "./pages/channelsList";
import UserProfile from "./pages/userProfile.tsx";
import { auth } from "./config/firebase-config.ts";
import { useUser } from "./context/User.tsx";
import { useVideoAndChannel } from "./context/VideoAndChannel.tsx";
import ChannelsDetail from "./pages/channelsDetail.tsx";
import CreateChannel from "./pages/createChannel.tsx";
import { getCurrentUserLikes } from "./utils/getCurrentUserLikes.ts";
import { useLikes } from "./context/Likes.tsx";
import SearchResult from "./components/search/searchResults.tsx";

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
