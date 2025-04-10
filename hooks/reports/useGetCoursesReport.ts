import { useQuery } from "@apollo/client";
import { COURSES_REPORT_QUERY } from "../../graphql/queries/CoursesReport";
import { CoursesReportQuery } from "../../graphql/queries/__generated__/CoursesReportQuery";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import useInfiniteScroll from "../useInfiniteScroll";
import { useState } from "react";

function useGetCoursesReport({ pagination = false, groupId = null} = {}) {
  const [loadingMore, setLoadingMore] = useState(false);

  const { loading, error, data, fetchMore, networkStatus } = useQuery<CoursesReportQuery>(COURSES_REPORT_QUERY, {
    variables: pagination ? { first: ITEMS_PER_PAGE, after: null, where: { includeProvisioned: true, groupId: groupId || null}  } : {},
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true
  });

  const loadMore = () => {
    if (loading || !pagination || !data?.courses?.pageInfo?.hasNextPage) return;

    setLoadingMore(true);
    fetchMore({
      variables: { after: data.courses.pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        setLoadingMore(false);
        if (!fetchMoreResult?.courses || prevResult.courses.pageInfo.endCursor == fetchMoreResult.courses.pageInfo.endCursor) return prevResult;

        return {
          courses: {
            ...fetchMoreResult.courses,
            edges: [...prevResult.courses.edges, ...fetchMoreResult.courses.edges],
            pageInfo: fetchMoreResult.courses.pageInfo,
          },
        };
      },
    }).catch(_error => setLoadingMore(false));
  };

  useInfiniteScroll(loadMore, pagination);

  const incialLoading = networkStatus != 3 && networkStatus != 7;

  return {
    courses: data?.courses,
    loading: incialLoading,
    loadingMore,
    error
  };
}

export default useGetCoursesReport;
