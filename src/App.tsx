import "./styles/videoCard.css";
import "./App.css";
import Header from "./components/Header.tsx";
import Banner from "./components/Banner";
import "/src/styles/header.css";
import VideoCard from "./components/videocard.tsx";
function App() {
  return (
    <>
      <Header />
      <Banner />
      <div className="container mx-auto px-4 mt-5 mb-4 flex flex-row justify-between	items-center">
        <h2 className="text-2xl	 font-bold	">Trending</h2>
      </div>
      <div className="video-wrapper flex flex-row gap-3 px-4">
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </div>
      <div className="container mx-auto px-4 mt-7 flex mb-4 flex-row justify-between	items-center">
        <h2 className="text-2xl	 font-bold	">Trending</h2>
      </div>
      <div className="video-wrapper flex flex-row mb-10 gap-3 px-4">
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </div>
    </>
  );
}

export default App;
