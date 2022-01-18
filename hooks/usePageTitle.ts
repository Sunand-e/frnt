import { useRef, useEffect } from "react";
import { pageTitleVar } from "../graphql/cache";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function usePageTitle(data) {
  useEffect(() => {
    pageTitleVar(data)
  },[data])
}

export default usePageTitle