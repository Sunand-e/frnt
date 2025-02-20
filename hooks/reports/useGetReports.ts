import { useQuery } from "@apollo/client";
import { GET_REPORTS } from "../../graphql/queries/allQueries";
import { GetReportsResponse } from "../../types/reports";
import { useEffect } from "react";
import { useViewStore } from "../../hooks/useViewStore";

function useGetReports({ pagination = false } = {}) {
  const { loading, error, data, fetchMore } = useQuery<GetReportsResponse>(GET_REPORTS, {
    variables: pagination ? { first: 20, after: null } : {},
  });
  console.log("🚀 GraphQL Query Data:", { loading, error, data });

  const loadMore = () => {
    if (pagination && data?.reports?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: { after: data.reports.pageInfo.endCursor },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult?.reports) return prevResult;

          return {
            reports: {
              ...fetchMoreResult.reports,
              edges: [
                ...prevResult.reports.edges,
                ...fetchMoreResult.reports.edges,
              ],
              pageInfo: fetchMoreResult.reports.pageInfo,
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
    reports: data?.reports,
    loading,
    error,
    loadMore,
  };
}

export default useGetReports;
