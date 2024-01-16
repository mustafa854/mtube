import { Link } from "react-router-dom";
import {
  googleSignin,
  isAuthenticated,
  userSignOut,
  userAccountDetails,
  getChannelLink,
} from "../services/firebase.js";
import { useEffect, useState } from "react";

function Header({ userDetails, channelExists }) {
  const [myChannelLink2, setMyChannelLink2] = useState("");
  const signIn = async () => {
    googleSignin();
    let userDetails = userAccountDetails();
  };
  const signOut = async () => {
    userSignOut();
  };
  getChannelLink().then((response) => {
    console.log("sssssssssssssss", response);
    setMyChannelLink2(response);
  });
  useEffect(() => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!", myChannelLink2);
  }, [myChannelLink2]);

  if (isAuthenticated()) {
    if (userDetails === false) {
      var userDetails = userAccountDetails();
      var userPhotoUrl = userDetails[0];
      var userEmail = userDetails[0];
      var userDisplayName = userDetails[0];
      var userProviderData = userDetails[0];
    } else {
      var userPhotoUrl = userDetails[0];
      var userEmail = userDetails[0];
      var userDisplayName = userDetails[0];
      var userProviderData = userDetails[0];
    }
  }
  console.log(isAuthenticated());
  console.log("exists????????????", channelExists);

  return (
    <>
      <div className="container mx-auto p-4 flex flex-row justify-between	items-center">
        <div className="flex flex-row gap-x-4">
          <div>
            <img className="header-icon" src="/src/assets/menu.svg" alt="" />
          </div>
          <div>
            <Link to={"/"}>
              <img
                className="header-icon--logo"
                src="/src/assets/logo.svg"
                alt=""
              />
            </Link>
          </div>
        </div>
        <div></div>
        <div className="flex flex-row gap-x-8 justify-center">
          <div className="flex flex-row gap-8 ">
            <Link to="/channels" className="my-auto">
              <p>Channels</p>
            </Link>
            <img
              className="header-icon my-auto"
              src="/src/assets/popupmenuHeader.svg"
              alt=""
            />
          </div>
          <div className="">
            {isAuthenticated() === false ? (
              <>
                <button
                  type="button"
                  className="flex flex-row hover:bg-sky-100 hover:border-sky-100 justify-center	items-center text-sky-600 p-2 border border-slate-200 rounded-full pt-0 pb-1"
                  onClick={signIn}
                >
                  <img
                    src="/src/assets/profile.svg"
                    className="header-icon pt-1 pr-2 fill-current text-sky-600"
                    alt=""
                  />
                  Signin
                </button>
              </>
            ) : (
              <>
                <div className="container flex flex-row gap-8">
                  {myChannelLink2 !== "" ? (
                    <Link
                      to={"/channels/" + myChannelLink2}
                      className="flex flex-row justify-center content-center"
                    >
                      {" "}
                      <p className="my-auto mr-2">My Channel</p>
                    </Link>
                  ) : (
                    <Link
                      to="/my-account"
                      className="flex flex-row justify-center content-center"
                    >
                      {" "}
                      <p className="my-auto mr-2">Create Channel</p>
                    </Link>
                  )}

                  <div>
                    <Link
                      to="/my-account"
                      className="flex flex-row justify-center content-center"
                    >
                      {" "}
                      <p className="my-auto mr-2">My Account</p>
                      <img
                        src={userPhotoUrl}
                        alt=""
                        className="mx-auto"
                        style={{
                          height: "30px",
                          width: "30px",
                          borderRadius: "500px",
                        }}
                      />
                    </Link>
                  </div>
                  <button
                    type="button"
                    className="my-auto flex flex-row hover:bg-sky-100 hover:border-sky-100 justify-center	items-center text-sky-600 p-2 border border-slate-200 rounded-full pt-0 pb-1"
                    onClick={signOut}
                  >
                    <img
                      src="/src/assets/profile.svg"
                      className="header-icon pt-1 pr-2 fill-current text-sky-600"
                      alt=""
                    />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
