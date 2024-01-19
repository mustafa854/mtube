import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getSearchResults } from "../../utils/search/getSearchResults";
import VideoCard from "../videocard";

function SearchResult() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState(["undefined"]);
  useEffect(() => {
    const query = searchParams.get("search_query");
    console.log("query", query);
    setSearchQuery(query);
    if (query !== "") {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchParams]);
  const fetchSearchResults = async () => {
    const response = await getSearchResults(searchParams.get("search_query"));
    setSearchResults(response);
  };

  useEffect(() => {
    console.log(searchResults);
    console.log();
  }, [searchResults]);

  if (searchResults.length === 0) {
    return <h1>No Results Found for: {searchQuery}</h1>;
  } else if (searchResults[0] !== "undefined") {
    return (
      <div className="container mt-2 w-5/6 flex flex-col mx-auto mb-10">
        <h2 className="font-bold text-4xl">
          Search Results for: {searchQuery}
        </h2>
        <div className="mt-4 video-wrapper grid grid-cols-3 gap-3 ">
          {searchResults.map((result) => (
            <VideoCard key={result.videosId} video={result} />
          ))}
        </div>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default SearchResult;