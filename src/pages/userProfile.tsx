import { isAuthenticated, userAccountDetails } from "../services/firebase";

function UserProfile({ userDetails }) {
  if (isAuthenticated()) {
    if (userDetails === false) {
      var userDetails = userAccountDetails();
      var userPhotoUrl = userDetails[0];
      var userEmail = userDetails[1];
      var userDisplayName = userDetails[2];
      var userProviderData = userDetails[3][0].providerId;
      return <h1>Current User Profile</h1>;
    } else {
      var userPhotoUrl = userDetails[0];
      var userEmail = userDetails[1];
      var userDisplayName = userDetails[2];
      var userProviderData = userDetails[3][0].providerId;

      return (
        <>
          <div
            className="container flex flex-col justify-center content-center px-4"
            style={{ height: "80vh" }}
          >
            <div className="mx-auto border-2 flex flex-col p-6 rounded-xl gap-4">
              <div className="flex flex-row gap-3 content-center justify-center">
                <div className="grow">
                  <img
                    src={userPhotoUrl}
                    alt=""
                    className="mx-auto rounded-xl"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-3 content-center justify-center">
                <div className="my-auto">
                  <p className="my-auto font-bold	">User Email:</p>
                </div>
                <div>
                  <p className="my-auto">{userEmail}</p>
                </div>
              </div>
              <div className="flex flex-row gap-3  content-center justify-center">
                <div className="my-auto">
                  <p className="my-auto font-bold	">Display Name:</p>
                </div>
                <div>
                  <p className="my-auto">{userDisplayName}</p>
                </div>
              </div>
              <div className="flex flex-row gap-3  content-center justify-center">
                <div className="my-auto">
                  <p className="my-auto font-bold	">Signup Method:</p>
                </div>
                <div>
                  <p className="my-auto">{userProviderData}</p>
                </div>
              </div>
              <div className="flex flex-row gap-3  content-center justify-center">
                <div className="my-auto">
                  <p className="my-auto font-bold	">Channel Link:</p>
                </div>
                <div>
                  <p className="my-auto">Channel Link</p>
                </div>
              </div>
              <div className="flex flex-row gap-3  content-center justify-center">
                <div className="my-auto">
                  <button
                    type="button"
                    className="hover:bg-slate-800 bg-black text-white p-2 px-4 ml-5 rounded-md"
                  >
                    Create Channel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  } else {
    return <h2>Please login first!</h2>;
  }
}

export default UserProfile;
