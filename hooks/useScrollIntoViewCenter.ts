import { useRef, useEffect } from "react";
import { pageTitleVar } from "../graphql/cache";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useScrollIntoViewCenter() {
  const ref = useRef(null)
  const scrollIntoViewCenter = () => {
    // ref.current
  }
}

export default useScrollIntoViewCenter