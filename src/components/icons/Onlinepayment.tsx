import React from "react";
import onlinepaymentIcon from "@assets/onlinepayment-icon.png";

function OnlinepaymentIcon({ size = 60 }) {
  return (
    <img
      src={onlinepaymentIcon}
      alt="Thanh toán trực tuyến"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
    />
  );
}

export default OnlinepaymentIcon;
