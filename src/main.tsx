import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "./context/User.tsx";
import { VideoAndChannelProvider } from "./context/VideoAndChannel.tsx";
import { LikesProvider } from "./context/Likes.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
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
