// import { Link } from "react-router-dom";
// function ChannelsCard({ channel }) {
//   return (
//     <>
//       <div className="container p-4 mx-auto ">
//         <Link to={"/channels/" + channel.channelsId}>
//           <div className="flex flex-row border-2 p-4 rounded-md">
//             <div>
//               <img
//                 src={channel.channelImage}
//                 style={{
//                   width: "40px",
//                   height: "40px",
//                   borderRadius: "500px",
//                   objectFit: "cover",
//                 }}
//                 alt=""
//               />
//             </div>
//             <div
//               className="flex flex-col justify-center items-start ml-2"
//               style={{
//                 maxHeight: "40px",
//               }}
//             >
//               <h3 className="text-base font-medium">{channel.channelName}</h3>
//               <h3 className="text-xs font-light">
//                 {channel.Subscribers} Subscribers
//               </h3>
//             </div>
//             <div className="ml-auto my-auto">
//               <button
//                 type="button"
//                 className="hover:bg-slate-800 justify-center bg-black text-white p-2 rounded-full px-4"
//               >
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </Link>
//       </div>
//     </>
//   );
// }

// export default ChannelsCard;

// The ChannelsCard component seems well-structured and functional for displaying information about a channel. Here are a few suggestions for improvement:

// Inline Styles: Instead of using inline styles for CSS properties like width, height, borderRadius, and objectFit, consider using CSS classes. This will help keep your code cleaner and make it easier to manage styles across your application.

// Button Styling: Consider applying consistent styling to the subscribe button across your application. You could define a CSS class for the button style and apply it here and to other buttons as well.

// Image Alt Text: Ensure that the alt attribute of the img element contains meaningful text for accessibility purposes. This text should describe the content or purpose of the image.

import { Link } from "react-router-dom";
// import "./ChannelsCard.css"; // Import CSS file for styling

function ChannelsCard({ channel }) {
  return (
    <div className="container p-4 mx-auto">
      <Link to={"/channels/" + channel.channelsId} className="channel-link">
        <div className="channel-card">
          <img
            src={channel.channelImage}
            alt={`Logo of ${channel.channelName}`} // Add meaningful alt text
            className="channel-logo"
          />
          <div className="channel-info">
            <h3 className="channel-name">{channel.channelName}</h3>
            <h3 className="channel-subscribers">
              {channel.Subscribers} Subscribers
            </h3>
          </div>
          <button className="subscribe-button">Subscribe</button>
        </div>
      </Link>
    </div>
  );
}

export default ChannelsCard;
