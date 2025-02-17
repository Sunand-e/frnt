import { useQuery } from "@apollo/client";
import { GET_COURSES } from "../../graphql/queries/courses/courses";
import { GetCourses } from "../../graphql/queries/__generated__/GetCourses";

function useGetCourses() {
  const { loading, error, data, fetchMore } = useQuery<GetCourses>(GET_COURSES, {
    variables: { first: 20, after: null },
  });

  const loadMore = () => {
    if (data?.courses?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: { after: data.courses.pageInfo.endCursor },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult?.courses) return prevResult;
  
          return {
            courses: {
              ...fetchMoreResult.courses,
              edges: [...prevResult.courses.edges, ...fetchMoreResult.courses.edges],
              pageInfo: fetchMoreResult.courses.pageInfo,
            },
          };
        },
      }).catch(error => console.error("FetchMore Error:", error));
    }
  };  

  return {
    courses: data?.courses,
    loading,
    error,
    loadMore,
    hasMore: data?.courses?.pageInfo?.hasNextPage || false,
  };
}

export default useGetCourses;
