import React, { useState, useEffect } from "react";
import axios from "axios";

const Autocomplete = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "https://countriesnow.space/api/v0.1/countries/population/cities"
        );
        setCities(response.data.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const handleChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
    setSelectedCity(""); // Reset the selected city on input change

    if (value.length >= 3) {
      const matchingCities = cities.filter((city) => {
        const cityName = city.city.toLowerCase();
        return (
          cityName.startsWith(value) ||
          cityName.endsWith(value) ||
          cityName.includes(value)
        );
      });

      setSuggestions(matchingCities.slice(0, 10));
    } else {
      setSuggestions([]);
    }
  };

  const handleCitySelect = (city) => {
    setSearch(city.city);
    setSelectedCity(city.city);
    setSuggestions([]);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-white mb-6">City Search</h1>
      <div className="bg-gray-700 p-6 rounded-lg shadow-md">
        <input
          type="text"
          placeholder="Search cities..."
          value={search}
          onChange={handleChange}
          className="w-full border-2 border-gray-600 rounded-md px-4 py-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        {suggestions.length > 0 && (
          <ul className="bg-gray-700 border border-gray-600 rounded-md mt-2 shadow-md">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.city}
                className="px-4 py-2 hover:bg-gray-600 cursor-pointer text-white"
                onClick={() => handleCitySelect(suggestion)}
              >
                {suggestion.city}
              </li>
            ))}
          </ul>
        )}
        {selectedCity && (
          <div className="mt-4 text-white">
            Selected City: <span className="font-bold">{selectedCity}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Autocomplete;
