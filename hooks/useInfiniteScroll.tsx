import { useEffect } from "react";
import { useViewStore } from "./useViewStore";

function useInfiniteScroll(loadMore: () => void, pagination: boolean) {
  const scrollableRef = useViewStore((state) => state.mainScrollableRef);

  useEffect(() => {
    if (!pagination || !scrollableRef.current) {
      return;
    }

    const handleScroll = () => {
      if (
        scrollableRef.current.scrollTop + scrollableRef.current.clientHeight >=
        scrollableRef.current.scrollHeight - 20
      ) {
        loadMore();
      }
    };

    scrollableRef.current.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      scrollableRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [scrollableRef, loadMore, pagination]);
}

export default useInfiniteScroll;
