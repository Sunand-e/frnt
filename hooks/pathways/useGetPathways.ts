import { useQuery } from "@apollo/client";
import { GET_PATHWAYS } from "../../graphql/queries/allQueries";
import { GetPathways } from "../../graphql/queries/__generated__/GetPathways";
import { useViewStore } from '../../hooks/useViewStore';
import { useEffect } from 'react';

function useGetPathways({ pagination = false } = {}) {
  const { loading, error, data, fetchMore } = useQuery<GetPathways>(GET_PATHWAYS, {
    variables: pagination ? { first: 20, after: null } : {},
  });

  const loadMore = () => {
    if (pagination && data?.pathways?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: { after: data.pathways.pageInfo.endCursor },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult?.pathways) return prevResult;

          return {
            pathways: {
              ...fetchMoreResult.pathways,
              edges: [
                ...prevResult.pathways.edges,
                ...fetchMoreResult.pathways.edges,
              ],
              pageInfo: fetchMoreResult.pathways.pageInfo,
            },
          };
        },
      }).catch((error) => console.error("FetchMore Error:", error));
    }
  };

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

  return {
    pathways: data?.pathways,
    loading,
    error,
    loadMore
  };
}

export default useGetPathways;