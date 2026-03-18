import React from "react";
import searchIcon from "@assets/search-icon.png";

function SearchIcon({ size = 60 }) {
  return (
    <img
      src={searchIcon}
      alt="Tra cứu hồ sơ"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
    />
  );
}

export default SearchIcon;
