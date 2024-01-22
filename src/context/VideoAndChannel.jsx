import React, { useContext, useState } from "react";
export const VideoandChannelContext = React.createContext({});

export const VideoAndChannelProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  return (
    <VideoandChannelContext.Provider
      value={{
        videos,
        setVideos,
        channels,
        setChannels,
      }}
    >
      {children}
    </VideoandChannelContext.Provider>
  );
};

export const useVideoAndChannel = () => {
  return useContext(VideoandChannelContext);
};
