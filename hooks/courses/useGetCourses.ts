import { useQuery } from "@apollo/client";
import { GET_COURSES } from "../../graphql/queries/courses/courses";
import { GetCourses } from "../../graphql/queries/__generated__/GetCourses";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import { SortingState } from "@tanstack/react-table";
import useInfiniteScroll from "../useInfiniteScroll";

function useGetCourses({ pagination = false } = {}) {
  const { loading, error, data, fetchMore, refetch } = useQuery<GetCourses>(GET_COURSES, {
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

  const reLoad = (categoryId: string, collectionId: string, globalFilter: string, sorting: SortingState) => {
    if (loading) return;
    
    refetch({
      variables: pagination ? { after: null } : {},
    }).catch(error => console.error("Refetch Error:", error));
  };

  useInfiniteScroll(loadMore, pagination);

  return {
    courses: data?.courses,
    loading,
    error,
    loadMore,
    reLoad
  };
}

export default useGetCourses;
