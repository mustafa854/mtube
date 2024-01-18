import React, { useContext, useState } from "react";
export const UserContext = React.createContext({});

export const UserProvider = ({ children }) => {
  const [myChannelLink, setMyChannelLink] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [userMeta, setUserMeta] = useState({});

  // Current Channel and curret User, i.e. detail view of both channel and User will be stored for
  // that component's local state or else it will cause issue as in multiple tabs if
  // we open same channel adn User then it will cause issue in performance by changing
  // global state again and again, so we can use local state for that
  //   const [currentUser, setCurrentUser] = useState();
  //   const [currentChannel, setCurrentChannel] = useState;
  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        userMeta,
        setUserMeta,
        myChannelLink,
        setMyChannelLink,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
