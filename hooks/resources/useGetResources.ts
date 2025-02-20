import { useQuery } from "@apollo/client";
import { GET_RESOURCES } from "../../graphql/queries/allQueries";
import { GetResources } from "../../graphql/queries/__generated__/GetResources";
import { useViewStore } from '../../hooks/useViewStore';
import { useEffect } from 'react';
import { ITEMS_PER_PAGE } from "../../utils/constants";

function useGetResources({ pagination = false } = {}) {
  const { loading, error, data, fetchMore } = useQuery<GetResources>(GET_RESOURCES, {
    variables: pagination ? { first: ITEMS_PER_PAGE, after: null } : {},
  });

  const loadMore = () => {
    if (pagination && data?.resources?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: { after: data.resources.pageInfo.endCursor },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult?.resources) return prevResult;

          return {
            resources: {
              ...fetchMoreResult.resources,
              edges: [
                ...prevResult.resources.edges,
                ...fetchMoreResult.resources.edges, // Append new results
              ],
              pageInfo: fetchMoreResult.resources.pageInfo,
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
    resources: data?.resources,
    loading,
    error,
    loadMore
  };
}

export default useGetResources;
