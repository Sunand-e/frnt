import { useEffect } from "react";
import useVersionStore from "../stores/versionStore";

const useVersionChecker = () => {
  const { checkForUpdate } = useVersionStore();

  useEffect(() => {
    // Perform the initial check for version
    checkForUpdate();

    // Set an interval to check for updates every 5 minutes
    const interval = setInterval(() => {
      checkForUpdate();
    }, 1 * 60 * 1000); // 5 minutes in milliseconds

    // Cleanup the interval when the component using this hook unmounts
    return () => clearInterval(interval);
  }, [checkForUpdate]);
};

export default useVersionChecker;
