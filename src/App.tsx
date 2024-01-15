import "./styles/videoCard.css";
import "./App.css";
import Header from "./components/Header.tsx";
import "/src/styles/header.css";
import { useEffect, useRef, useState } from "react";
import { getVideos, getChannels } from "./services/firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import VideoDetails from "./pages/videoDetail";
import NotFound from "./pages/notFound";
import ChannelList from "./pages/channelsList";
import ChannelsDetail from "./pages/channelsDetail.tsx";
import ChannelUserProfile from "./pages/channelUserProfile.tsx";
import UploadVideoProfile from "./pages/uploadVideoProfile";
import EditProfile from "./pages/editProfile";
import UserProfile from "./pages/userProfile.tsx";
function App() {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  const shouldFetch = useRef(true);

  const fetchData = async () => {
    try {
      const videosFetched = await getVideos();
      const channelsFetched = await getChannels();
      videosFetched.forEach((element) => {
        let dataAppend = element.data();
        dataAppend.id = element.id;
        setVideos((prevArray) => [...prevArray, dataAppend]);
      });
      channelsFetched.forEach((element) => {
        let dataAppend = element.data();
        dataAppend.id = element.id;
        setChannels((prevArray) => [...prevArray, dataAppend]);
      });
      console.log(channels);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    if (shouldFetch.current) {
      shouldFetch.current = false;

      fetchData();
    }
  }, []);
  if (videos) {
    return (
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home videos={videos} />} />
          <Route path="/:id" element={<VideoDetails videos={videos} />} />
          <Route
            path="channels"
            element={<ChannelList channels={channels} />}
          />
          <Route path="my-account" element={<UserProfile />} />
          <Route
            path="/channels/:id"
            element={<ChannelsDetail channels={channels} />}
          />
          <Route
            path="/channels/:id/videos"
            element={<ChannelsDetail channels={channels} />}
          />
          <Route
            path="/channels/:id/upload"
            element={<UploadVideoProfile channels={channels} />}
          />
          <Route
            path="/channels/:id/edit_profile"
            element={<EditProfile channels={channels} />}
          />
          <Route
            path="/channels/:id/profile"
            element={<ChannelUserProfile channels={channels} />}
          />
          <Route element={<NotFound />} />
        </Routes>
      </Router>
    );
  } else {
    return <h1>Loading Videos...</h1>;
  }
}

export default App;
