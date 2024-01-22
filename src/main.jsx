import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./context/User.jsx";
import { VideoAndChannelProvider } from "./context/VideoAndChannel.jsx";
import { LikesProvider } from "./context/Likes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <VideoAndChannelProvider>
        <LikesProvider>
          <App />
        </LikesProvider>
      </VideoAndChannelProvider>
    </UserProvider>
  </React.StrictMode>
);
