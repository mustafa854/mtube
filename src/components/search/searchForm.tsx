import { useState } from "react";
import { Link } from "react-router-dom";

function SearchForm() {
  const [searchText, setSearchText] = useState("");
  return (
    <form>
      <div className="flex flex-row w-full">
        <input
          type="text"
          placeholder="Search"
          className="flex-grow border w-96 ml-4 p-1 pl-4 rounded-l-full font-normal text-black focus:outline-none placeholder:font-normal placeholder:text-black"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <Link
          className="border border-l-0 p-1 px-4 rounded-r-full font-normal text-black focus:outline-none placeholder:font-normal placeholder:text-black"
          to={"results/?search_query=" + searchText}
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
        </Link>
      </div>
    </form>
  );
}

export default SearchForm;
