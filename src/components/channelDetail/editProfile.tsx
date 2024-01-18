import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateChannel } from "../../utils/updateChannel";
import { useUser } from "../../context/User";
import { getCurrentChannel } from "../../services/firebase";

function EditProfile({ channelDetail, setChannelDetail }) {
  const { myChannelLink, setMyChannelLink } = useUser();

  const [channelName, setChannelName] = useState(channelDetail.channelName);
  const [channelAbout, setChannelAbout] = useState(channelDetail.channelAbout);
  const [channelCover, setChannelCover] = useState(channelDetail.channelCover);
  const [channelImage, setChannelImage] = useState(channelDetail.channelImage);
  const [message, setMessage] = useState("");
  const getCurrentChannelInfo = async () => {
    const response = await getCurrentChannel(myChannelLink);
    setChannelDetail(response);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (myChannelLink !== "" || myChannelLink !== undefined) {
      const response = await updateChannel(
        channelName,
        channelAbout,
        channelCover,
        channelImage,
        myChannelLink
      );
      await getCurrentChannelInfo();
      setMessage("Your Channel has been Updated Successfully!!!");
    }
  };
  return (
    <>
      {myChannelLink === "" && myChannelLink === undefined ? (
        <div className="flex flex-row gap-3  content-center justify-center">
          <div className="my-auto">
            <p className="my-auto font-bold	">Channel Link:</p>
          </div>
          <div>
            <Link
              type="button"
              className="hover:bg-slate-800 bg-black text-white p-2 px-4 ml-5 rounded-md"
              to="/create-channels/"
            >
              Create Channel
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-row gap-3  content-center justify-center">
          <div className="my-auto">
            <div className="container">
              <div
                className="w-full mx-auto mt-10"
                style={{ minWidth: "600px" }}
              >
                <form
                  className="bg-white border-2 rounded-xl px-8 py-6 pb-8 mb-4"
                  onSubmit={submitForm}
                >
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="channelName"
                    >
                      Channel Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="channelName"
                      type="text"
                      placeholder="Enter Channel Name here..."
                      onChange={(e) => setChannelName(e.target.value)}
                      value={channelName}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="channelAbout"
                    >
                      Channel About
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="channelAbout"
                      type="text"
                      placeholder="Enter Channel About here..."
                      onChange={(e) => setChannelAbout(e.target.value)}
                      value={channelAbout}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="channelCover"
                    >
                      Channel Cover
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="channelCover"
                      type="text"
                      placeholder="Enter Channel Cover Link here..."
                      onChange={(e) => setChannelCover(e.target.value)}
                      value={channelCover}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="channelImage"
                    >
                      Channel Image
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="channelImage"
                      type="text"
                      placeholder="Enter Channel Image Link here..."
                      onChange={(e) => setChannelImage(e.target.value)}
                      value={channelImage}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mx-auto px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Update Channel
                    </button>
                  </div>
                  {message === "" ? (
                    <></>
                  ) : (
                    <div className="flex flex-row">
                      <p className="mx-auto mt-5 text-green-500">{message}</p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditProfile;
