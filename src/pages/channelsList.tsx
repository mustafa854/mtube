import ChannelsCard from "../components/channelsCard";

function ChannelList(props) {
  const { channels } = props;
  return (
    <>
      <div className="container grid grid-cols-2 p-4 ">
        {channels.map((channel) => (
          <ChannelsCard key={channel.id} channel={channel} />
        ))}
      </div>
    </>
  );
}

export default ChannelList;
