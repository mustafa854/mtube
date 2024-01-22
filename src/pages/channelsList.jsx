import ChannelsCard from "../components/channelsCard";
import { useVideoAndChannel } from "../context/VideoAndChannel";

function ChannelList() {
  const { channels } = useVideoAndChannel();
  if (channels) {
    return (
      <>
        <div className="container grid grid-cols-2 p-4 ">
          {channels.map((channel) => (
            <ChannelsCard key={channel.channelsId} channel={channel} />
          ))}
        </div>
      </>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default ChannelList;
