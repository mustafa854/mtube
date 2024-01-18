import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/User.tsx";
import { VideoAndChannelProvider } from "./context/VideoAndChannel.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <VideoAndChannelProvider>
        <App />
      </VideoAndChannelProvider>
    </UserProvider>
  </React.StrictMode>
);
