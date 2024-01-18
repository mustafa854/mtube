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
import ChannelUserProfile from "./pages/channelUserProfile.tsx";
import UploadVideoProfile from "./pages/uploadVideoProfile";
import EditProfile from "./pages/editProfile";
import UserProfile from "./pages/userProfile.tsx";
import { auth } from "./config/firebase-config.ts";
import { useUser } from "./context/User.tsx";
import { useVideoAndChannel } from "./context/VideoAndChannel.tsx";
import ChannelsDetail from "./pages/channelsDetail.tsx";

function App() {
  const { myChannelLink, setMyChannelLink, userDetails, setUserDetails } =
    useUser();
  const { videos, setVideos, channels, setChannels } = useVideoAndChannel();

  const fetchIsChannelCreated = async () => {
    const response = await getChannelLink();
    setMyChannelLink(response);
  };
  const fetchUserDetails = async () => {
    const response = await userAccountDetails();
    setUserDetails(response);
  };
  useEffect(() => {
    if (auth.currentUser) {
      fetchIsChannelCreated();
      fetchUserDetails();
    }
  }, [auth.currentUser]);
  // useEffect(() => {
  //   console.log(
  //     "isLoggedIn: ",
  //     auth.currentUser,
  //     " myChannelLink: ",
  //     myChannelLink,
  //     "user details",
  //     userDetails
  //   );
  // }, [auth.currentUser, myChannelLink, userDetails]);

  /**
   *
   *
   */
  const fetchChannels = async () => {
    const response = await getChannels();
    response.forEach((element) => {
      setChannels((prevArray) => [...prevArray, element.data()]);
    });
    // console.log(channels);
  };
  const fetchVideos = async () => {
    const response = await getVideos();
    response.forEach((element) => {
      setVideos((prevArray) => [...prevArray, element.data()]);
    });
  };
  // const [videos, setVideos] = useState([]);
  // const [channels, setChannels] = useState([]);

  const shouldFetch = useRef(true);

  useEffect(() => {
    if (shouldFetch.current) {
      shouldFetch.current = false;

      fetchChannels();
      fetchVideos();
    }
  }, []);
  // useEffect(() => {
  //   console.log(videos);
  //   console.log(channels);
  // }, [videos, channels]);
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/:id" element={<VideoDetails />} />
        <Route path="channels" element={<ChannelList />} />
        <Route path="my-account" element={<UserProfile />} />
        <Route path="/channels/:id/*" element={<ChannelsDetail />} />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
