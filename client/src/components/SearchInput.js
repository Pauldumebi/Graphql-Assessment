import React from "react";

const Search = ({ handleSearch }) => {

  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={handleSearch}
      style={searchStyle}
    />
  );
};

export default Search;

const searchStyle = {
  padding: "1rem",
  width: "50%",
  margin: "2rem auto",
  display: "flex"
};