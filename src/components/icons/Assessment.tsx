import React from "react";
import assessmentIcon from "@assets/assessment-icon.png";

function AssessmentIcon({ size = 60 }) {
  return (
    <img
      src={assessmentIcon}
      alt="Trang thông tin điện tử"
      width={size}
      height={size}
      style={{ objectFit: "contain" }}
    />
  );
}

export default AssessmentIcon;
