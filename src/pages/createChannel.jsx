// import { Link } from "react-router-dom";
// import { useUser } from "../context/User";
// import { createChannel } from "../utils/createChannel";
// import { useState } from "react";

// function CreateChannel() {
//   const { myChannelLink, setMyChannelLink } = useUser();

//   const [channelName, setChannelName] = useState("");
//   const [channelAbout, setChannelAbout] = useState("");
//   const [channelCover, setChannelCover] = useState("");
//   const [channelImage, setChannelImage] = useState("");
//   const submitForm = async (e) => {
//     e.preventDefault();
//     if (myChannelLink === "" || myChannelLink === undefined) {
//       const response = await createChannel(
//         channelName,
//         channelAbout,
//         channelCover,
//         channelImage
//       );
//       setMyChannelLink(response);
//       setChannelName("");
//       setChannelAbout("");
//       setChannelCover("");
//       setChannelImage("");
//     }
//   };

//   return (
//     <>
//       {myChannelLink !== "" && myChannelLink !== undefined ? (
//         <div className="flex flex-row gap-3  content-center justify-center">
//           <div className="my-auto">
//             <p className="my-auto font-bold	">Channel Link:</p>
//           </div>
//           <div>
//             <Link to={"/channels/" + myChannelLink + "/edit_profile"}>
//               <p className="my-auto text-sky-600">
//                 {"https://localhost/channels/" +
//                   myChannelLink +
//                   "/edit_profile"}
//               </p>
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-row gap-3  content-center justify-center">
//           <div className="my-auto">
//             <div className="container">
//               <div
//                 className="w-full mx-auto mt-10"
//                 style={{ minWidth: "600px" }}
//               >
//                 <form
//                   className="bg-white border-2 rounded-xl px-8 py-6 pb-8 mb-4"
//                   onSubmit={submitForm}
//                 >
//                   <div className="mb-4">
//                     <label
//                       className="block text-gray-700 text-sm font-bold mb-2"
//                       htmlFor="channelName"
//                     >
//                       Channel Name
//                     </label>
//                     <input
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="channelName"
//                       type="text"
//                       placeholder="Enter Channel Name here..."
//                       onChange={(e) => setChannelName(e.target.value)}
//                       value={channelName}
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label
//                       className="block text-gray-700 text-sm font-bold mb-2"
//                       htmlFor="channelAbout"
//                     >
//                       Channel About
//                     </label>
//                     <input
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="channelAbout"
//                       type="text"
//                       placeholder="Enter Channel About here..."
//                       onChange={(e) => setChannelAbout(e.target.value)}
//                       value={channelAbout}
//                     />
//                   </div>
//                   <div className="mb-4">
//                     <label
//                       className="block text-gray-700 text-sm font-bold mb-2"
//                       htmlFor="channelCover"
//                     >
//                       Channel Cover
//                     </label>
//                     <input
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="channelCover"
//                       type="text"
//                       placeholder="Enter Channel Cover Link here..."
//                       onChange={(e) => setChannelCover(e.target.value)}
//                       value={channelCover}
//                     />
//                   </div>
//                   <div className="mb-6">
//                     <label
//                       className="block text-gray-700 text-sm font-bold mb-2"
//                       htmlFor="channelImage"
//                     >
//                       Channel Image
//                     </label>
//                     <input
//                       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                       id="channelImage"
//                       type="text"
//                       placeholder="Enter Channel Image Link here..."
//                       onChange={(e) => setChannelImage(e.target.value)}
//                       value={channelImage}
//                     />
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <button
//                       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mx-auto px-4 rounded focus:outline-none focus:shadow-outline"
//                       type="submit"
//                     >
//                       Create Channel
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
// export default CreateChannel;

// Form Input Handling: You're using separate state variables for each input field in your form. This is fine, but you can optimize it further by using a single state object to manage all form values. This approach simplifies the code and makes it easier to manage form state.

// Conditional Rendering Logic: Your conditional rendering logic for displaying the channel link or the channel creation form is clear, but you might want to consider extracting it into a separate function or component for better organization and readability.

// Form Submission: Consider adding form validation logic to ensure that the user provides all necessary information before submitting the form. This helps prevent incomplete submissions and provides a better user experience.

import { Link } from "react-router-dom";
import { useUser } from "../context/User";
import { createChannel } from "../utils/createChannel";
import { useState } from "react";

function CreateChannel() {
  const { myChannelLink, setMyChannelLink } = useUser();

  const [formData, setFormData] = useState({
    channelName: "",
    channelAbout: "",
    channelCover: "",
    channelImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (myChannelLink === "" || myChannelLink === undefined) {
      const response = await createChannel(formData);
      setMyChannelLink(response);
      setFormData({
        channelName: "",
        channelAbout: "",
        channelCover: "",
        channelImage: "",
      });
    }
  };

  const renderChannelLink = () => (
    <div className="flex flex-row gap-3 content-center justify-center">
      <div className="my-auto">
        <p className="my-auto font-bold">Channel Link:</p>
      </div>
      <div>
        <Link to={"/channels/" + myChannelLink + "/edit_profile"}>
          <p className="my-auto text-sky-600">
            {"https://localhost/channels/" + myChannelLink + "/edit_profile"}
          </p>
        </Link>
      </div>
    </div>
  );

  const renderCreateChannelForm = () => (
    <div className="flex flex-row gap-3 content-center justify-center">
      <div className="my-auto">
        <div className="container">
          <div className="w-full mx-auto mt-10" style={{ minWidth: "600px" }}>
            <form
              className="bg-white border-2 rounded-xl px-8 py-6 pb-8 mb-4"
              onSubmit={submitForm}
            >
              {/* Form fields */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {myChannelLink !== "" && myChannelLink !== undefined
        ? renderChannelLink()
        : renderCreateChannelForm()}
    </>
  );
}

export default CreateChannel;
