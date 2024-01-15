import { Link } from "react-router-dom";
import {
  googleSignin,
  isAuthenticated,
  userSignOut,
  userAccountDetails,
} from "../services/firebase.js";

function Header() {
  const signIn = async () => {
    googleSignin();
    let userDetails = userAccountDetails();
    let userPhotoUrl = userDetails[0];
    let userEmail = userDetails[0];
    let userDisplayName = userDetails[0];
    let userProviderData = userDetails[0];
  };
  const signOut = async () => {
    userSignOut();
  };
  if (isAuthenticated()) {
    let userDetails = userAccountDetails();
    var userPhotoUrl = userDetails[0];
    var userEmail = userDetails[0];
    var userDisplayName = userDetails[0];
    var userProviderData = userDetails[0];
  }
  console.log(isAuthenticated());
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
        <div className="flex flex-row gap-x-2 justify-center">
          <div className="flex flex-row gap-3 ">
            <Link to="/channels" className="my-auto">
              <p>Channels</p>
            </Link>
            <img
              className="header-icon"
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
                <div className="container flex flex-row gap-4">
                  <div>
                    <Link to="/my-account">
                      <img
                        src={userPhotoUrl}
                        alt=""
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
                    className="flex flex-row hover:bg-sky-100 hover:border-sky-100 justify-center	items-center text-sky-600 p-2 border border-slate-200 rounded-full pt-0 pb-1"
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
