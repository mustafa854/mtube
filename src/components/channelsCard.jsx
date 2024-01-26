import { Link } from "react-router-dom";
function ChannelsCard({ channel }) {
  return (
    <>
      <div className="container p-4 mx-auto ">
        <Link to={"/channels/" + channel.channelsId}>
          <div className="flex flex-row border-2 p-4 rounded-md">
            <div>
              <img
                src={channel.channelImage}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "500px",
                  objectFit: "cover",
                }}
                alt=""
              />
            </div>
            <div
              className="flex flex-col justify-center items-start ml-2"
              style={{
                maxHeight: "40px",
              }}
            >
              <h3 className="text-base font-medium">{channel.channelName}</h3>
              <h3 className="text-xs font-light">
                {channel.Subscribers} Subscribers
              </h3>
            </div>
            <div className="ml-auto my-auto">
              <button
                type="button"
                className="hover:bg-slate-800 justify-center bg-black text-white p-2 rounded-full px-4"
              >
                Subscribe
              </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default ChannelsCard;
