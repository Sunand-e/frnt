import { useQuery } from "@apollo/client";
import { COURSES_REPORT_QUERY } from "../../graphql/queries/CoursesReport";
import { CoursesReportQuery } from "../../graphql/queries/__generated__/CoursesReportQuery";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import useInfiniteScroll from "../useInfiniteScroll";

function useGetCoursesReport({ pagination = false } = {}) {
  const { loading, error, data, fetchMore, refetch } = useQuery<CoursesReportQuery>(COURSES_REPORT_QUERY, {
    variables: pagination ? { first: ITEMS_PER_PAGE, after: null } : {},
  });

  const loadMore = () => {
    if (loading || !pagination || !data?.courses?.pageInfo?.hasNextPage) return;
    
    fetchMore({
      variables: { after: data.courses.pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult?.courses || prevResult.courses.pageInfo.endCursor == fetchMoreResult.courses.pageInfo.endCursor) return prevResult;

        return {
          courses: {
            ...fetchMoreResult.courses,
            edges: [...prevResult.courses.edges, ...fetchMoreResult.courses.edges],
            pageInfo: fetchMoreResult.courses.pageInfo,
          },
        };
      },
    }).catch(error => console.error("FetchMore Error:", error));
  };

  useInfiniteScroll(loadMore, pagination);

  return {
    courses: data?.courses,
    loading,
    error,
    loadMore,
    refetchUsers: refetch
  };
}

export default useGetCoursesReport;
