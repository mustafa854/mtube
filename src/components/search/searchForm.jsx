// import { useState } from "react";
// import { Link } from "react-router-dom";

// function SearchForm() {
//   const [searchText, setSearchText] = useState("");
//   return (
//     <form className="mx-auto w-full">
//       <div className="flex flex-row w-full px-4">
//         <input
//           type="text"
//           placeholder="Search"
//           className="flex-grow border w-96 p-1 pl-4 rounded-l-full font-normal text-black focus:outline-none placeholder:font-normal placeholder:text-black"
//           onChange={(e) => setSearchText(e.target.value)}
//           value={searchText}
//         />
//         <Link
//           className="border border-l-0 p-1 px-4 rounded-r-full font-normal text-black focus:outline-none placeholder:font-normal placeholder:text-black"
//           to={"results/?search_query=" + searchText}
//         >
//           <svg
//             width="24"
//             height="24"
//             viewBox="0 0 21 21"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <g
//               fill="none"
//               fillRule="evenodd"
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="8.5" cy="8.5" r="5" />
//               <path d="M17.571 17.5L12 12" />
//             </g>
//           </svg>
//         </Link>
//       </div>
//     </form>
//   );
// }

// export default SearchForm;

// The SearchForm component looks clean and well-structured. Here are a few suggestions for improvement:

// Accessibility: Add an accessible label for the search input field using the <label> element and associate it with the input using the htmlFor attribute. This helps screen readers and improves accessibility.

// Input Width: The width of the input field (w-96) is hardcoded. Consider making it responsive or using relative units like percentages to adapt to different screen sizes.

// Search Button: The search button could use a hover effect or some visual indication to make it more interactive.

// Search Text Handling: Ensure that the search text is properly encoded for the URL to handle special characters and spaces correctly.

// Keyboard Accessibility: Consider adding keyboard accessibility by allowing users to submit the form using the Enter key when the input field is focused.

import { useState } from "react";
import { Link } from "react-router-dom";

function SearchForm() {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim() !== "") {
      window.location.href =
        "/results/?search_query=" + encodeURIComponent(searchText.trim());
    }
  };

  return (
    <form className="mx-auto w-full" onSubmit={handleSearch}>
      <div className="flex flex-row w-full px-4">
        <label htmlFor="searchInput" className="sr-only">
          Search
        </label>
        <input
          type="text"
          id="searchInput"
          placeholder="Search"
          className="flex-grow border w-full p-1 pl-4 rounded-l-full font-normal text-black focus:outline-none placeholder:font-normal placeholder:text-black"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <button
          type="submit"
          className="border border-l-0 p-1 px-4 rounded-r-full font-normal text-black focus:outline-none placeholder:font-normal placeholder:text-black hover:bg-gray-100"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 21 21"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              fillRule="evenodd"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8.5" cy="8.5" r="5" />
              <path d="M17.571 17.5L12 12" />
            </g>
          </svg>
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
