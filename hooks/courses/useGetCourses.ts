import { useQuery } from "@apollo/client";
import { GET_COURSES } from "../../graphql/queries/courses/courses";
import { GetCourses } from "../../graphql/queries/__generated__/GetCourses";
import { useEffect } from "react";
import { useViewStore } from "../../hooks/useViewStore";

function useGetCourses({ pagination = false } = {}) {
  const { loading, error, data, fetchMore } = useQuery<GetCourses>(GET_COURSES, {
    variables: pagination ? { first: 10, after: null } : {},
  });

  const loadMore = () => {
    if (pagination && data?.courses?.pageInfo?.hasNextPage) {
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
    courses: data?.courses,
    loading,
    error,
    loadMore
  };
}

export default useGetCourses;
