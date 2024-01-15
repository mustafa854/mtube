import "./styles/videoCard.css";
import "./App.css";
import Header from "./components/Header.tsx";
import "/src/styles/header.css";
import { useEffect, useRef, useState } from "react";
import { getVideos } from "./services/firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import VideoDetails from "./pages/videoDetail";
import NotFound from "./pages/notFound";
function App() {
  const [videos, setVideos] = useState([]);
  const shouldFetch = useRef(true);

  const fetchData = async () => {
    try {
      const videosFetched = await getVideos();
      videosFetched.forEach((element) => {
        let dataAppend = element.data();
        dataAppend.id = element.id;
        setVideos((prevArray) => [...prevArray, dataAppend]);
      });
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

  useEffect(() => {
    console.log("Updated Videos:", videos);
  }, [videos]);

  if (videos) {
    return (
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home videos={videos} />} />
          <Route path="/:id" element={<VideoDetails videos={videos} />} />
          <Route element={<NotFound />} />
        </Routes>
      </Router>
    );
  } else {
    return <h1>Loading Videos...</h1>;
  }
}

export default App;
