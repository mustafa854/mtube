import { Link } from "react-router-dom";
import { googleSignin, userSignOut } from "../services/firebase.ts";
import { auth } from "../config/firebase-config.js";
import { useUser } from "../context/User.tsx";
import SearchForm from "./search/searchForm.tsx";

function Header() {
  const { myChannelLink, userDetails } = useUser();

  const signIn = async () => {
    googleSignin();
  };
  const signOut = async () => {
    userSignOut();
  };

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
        <div className="">
          <SearchForm />
        </div>
        <div className="flex flex-row gap-x-8 justify-center">
          <div className="flex flex-row gap-8 ">
            <Link to="/channels" className="my-auto">
              <p>Channels</p>
            </Link>
            <Link to="/videos" className="my-auto">
              <p>Videos</p>
            </Link>
            <img
              className="header-icon my-auto"
              src="/src/assets/popupmenuHeader.svg"
              alt=""
            />
          </div>
          <div className="">
            {auth.currentUser ? (
              <>
                <div className="container flex flex-row gap-8">
                  {myChannelLink !== "" && myChannelLink !== undefined ? (
                    <Link
                      to={"/channels/" + myChannelLink}
                      className="flex flex-row justify-center content-center"
                    >
                      <p className="my-auto mr-2">My Channel</p>
                    </Link>
                  ) : (
                    <Link
                      to="/my-account"
                      className="flex flex-row justify-center content-center"
                    >
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
                        src={userDetails.photo}
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
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
