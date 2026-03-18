import React from "react";
import webportalIcon from "@assets/webportal-icon.png";

function WebportalIcon({ size = 60 }) {
  return (
    <img
      src={webportalIcon}
      alt="Trang thông tin điện tử"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
    />
  );
}

export default WebportalIcon;
