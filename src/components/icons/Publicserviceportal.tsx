import React from "react";
import publicserviceportalIcon from "@assets/publicserviceportal-icon.png";

function PublicserviceportalIcon({ size = 60 }) {
  return (
    <img
      src={publicserviceportalIcon}
      alt="Trang thông tin điện tử"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
    />
  );
}

export default PublicserviceportalIcon;
