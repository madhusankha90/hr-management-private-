import React, { useState } from "react";

const AdminLocation = () => {
  const [locationInput, setLocationInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (locationInput.trim() === "") {
      setSearchResults([]);
      setError("");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          locationInput + ", Sri Lanka"
        )}&format=json&addressdetails=1&limit=5`,
        {
          headers: {
            "User-Agent": "YourAppName/1.0 (your-email@example.com)",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch locations");
      }

      const data = await response.json();
      if (data.length === 0) {
        setSearchResults([]);
        setError("No results found.");
      } else {
        const results = data.map((item) => item.display_name);
        setSearchResults(results);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
      setError("An error occurred while fetching locations.");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col mx-auto w-full p-6 lg:p-5 bg-white rounded-xl shadow-md">
      <h2 className="text-base lg:text-sm font-semibold mb-6">
        Company Location
      </h2>
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div className="flex-1">
          <label
            htmlFor="location"
            className="block text-xs font-semibold text-gray-700 mb-2"
          >
            Select Company Location
          </label>
          <input
            type="text"
            id="location"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            className="block w-full p-4 lg:p-3 text-xs border border-gray-300 rounded-xl focus:border-yellow-500 focus:outline-none"
            placeholder="Type a location in Sri Lanka"
            aria-label="Company location input"
          />
        </div>
        <div className="mt-0 lg:mt-7">
        <button
          onClick={handleSearch}
          className="text-sm bg-green-500 hover:bg-green-600 py-2 w-[6rem] lg:w-[9rem] text-white rounded-xl focus:outline-none font-bold"
          aria-label="Search for location"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>
      </div>

      {/* Display search results or messages */}
      <div className="mt-4 mb-6 lg:mt-1 max-w-2xl bg-gray-300 rounded-lg" aria-live="polite">
        {error && <p className="text-xs text-red-500">{error}</p>}
        {searchResults.length > 0 && (
          <ul className="list-disc pl-6">
            {searchResults.map((result, index) => (
              <li key={index} className="text-xs text-gray-700">
                {result}
              </li>
            ))}
          </ul>
        )}
        {locationInput && !isLoading && searchResults.length === 0 && !error && (
          <p className="text-xs text-gray-500 mt-2">No results found.</p>
        )}
      </div>
      <div>
        <h2 className="text-sm">
          Current Company Location
        </h2>
      </div>
    </div>
  );
};

export default AdminLocation;
