import Loader from "../components/Loader";
import ChannelsCard from "../components/channelsCard";
import { useVideoAndChannel } from "../context/VideoAndChannel";

function ChannelList() {
  const { channels } = useVideoAndChannel();
  if (channels) {
    return (
      <>
        <div className="lg:container mx-auto grid grid-cols-1 md:grid-cols-2 py-4 ">
          {channels.map((channel) => (
            <ChannelsCard key={channel.channelsId} channel={channel} />
          ))}
        </div>
      </>
    );
  } else {
    return <Loader height={"70vh"} />;
  }
}

export default ChannelList;
