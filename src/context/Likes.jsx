import React, { useContext, useState } from "react";
export const LikesContext = React.createContext({});

export const LikesProvider = ({ children }) => {
  const [likes, setLikes] = useState([]);
  return (
    <LikesContext.Provider
      value={{
        likes,
        setLikes,
      }}
    >
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => {
  return useContext(LikesContext);
};
