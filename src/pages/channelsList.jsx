// import Loader from "../components/Loader";
// import ChannelsCard from "../components/channelsCard";
// import { useVideoAndChannel } from "../context/VideoAndChannel";

// function ChannelList() {
//   const { channels } = useVideoAndChannel();
//   if (channels) {
//     return (
//       <>
//         <div className="lg:container mx-auto grid grid-cols-1 md:grid-cols-2 py-4 ">
//           {channels.map((channel) => (
//             <ChannelsCard key={channel.channelsId} channel={channel} />
//           ))}
//         </div>
//       </>
//     );
//   } else {
//     return <Loader height={"70vh"} />;
//   }
// }

// export default ChannelList;

// Consistent Imports: Ensure consistent import styles throughout your codebase. You're using both default and named imports in this file. Stick to one style for consistency, either use named imports for all components or default imports.

// Destructure Props: When using props in your component, consider destructuring them directly in the function signature to improve readability and avoid repetition.

import { useVideoAndChannel } from "../context/VideoAndChannel";
import ChannelsCard from "../components/channelsCard";
import Loader from "../components/Loader";

function ChannelList() {
  const { channels } = useVideoAndChannel();

  if (channels) {
    return (
      <div className="lg:container mx-auto grid grid-cols-1 md:grid-cols-2 py-4">
        {channels.map(({ channelsId, channel }) => (
          <ChannelsCard key={channelsId} channel={channel} />
        ))}
      </div>
    );
  } else {
    return <Loader height={"70vh"} />;
  }
}

export default ChannelList;
