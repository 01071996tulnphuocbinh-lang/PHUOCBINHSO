import { FC, useEffect } from "react";
import { checkFollowStatus } from "../api/zalo";

const OAConnector: FC = () => {
  useEffect(() => {
    const syncFollowStatus = async () => {
      const isPermanentFollowed = localStorage.getItem("oa_followed_permanent") === "true";
      if (isPermanentFollowed) return;

      const sdkStatus = await checkFollowStatus();
      if (sdkStatus) {
        localStorage.setItem("oa_followed_permanent", "true");
      }
    };

    syncFollowStatus();
  }, []);

  return null;
};

export default OAConnector;
