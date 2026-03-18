import React from "react";
import webportalIcon from "@assets/feedback-icon.png";

function FeedbackIcon({ size = 60 }) {
  return (
    <img
      src={webportalIcon}
      alt="Phản ánh, kiến nghị"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
    />
  );
}

export default FeedbackIcon;
