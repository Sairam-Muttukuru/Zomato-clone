import React, { useState } from "react";

const CitySearch = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim() !== "") {
      onSearch(city);
    }
  };

  return (
    <div className="city-search">
      <input
        type="text"
        placeholder="Enter city (e.g., Delhi, Hyderabad)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default CitySearch;