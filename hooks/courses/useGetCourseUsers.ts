import { useQuery } from "@apollo/client"
import { GET_COURSE_USERS } from "../../graphql/queries/courses/courseUsers";
import { GetCourseUsers } from "../../graphql/queries/courses/__generated__/GetCourseUsers";
import useInfiniteScroll from "../useInfiniteScroll";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import { useState } from "react";

function useGetCourseUsers(id: any) {
  const [loadingMore, setLoadingMore] = useState(false);
  const { loading, error, data, fetchMore, networkStatus } = useQuery<GetCourseUsers>(GET_COURSE_USERS, {
    variables: { id, first: ITEMS_PER_PAGE, after: null },
    skip: !id,
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true
  });

  const loadMore = () => {
    if (loading || !data?.course.users?.pageInfo?.hasNextPage) return;
    setLoadingMore(true);
    fetchMore({
      variables: { after: data.course.users.pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        setLoadingMore(false);
        if (!fetchMoreResult?.course.users || prevResult.course.users.pageInfo.endCursor == fetchMoreResult.course.users.pageInfo.endCursor) return prevResult;
        const course = {
          ...fetchMoreResult.course,
          users: {
            ...fetchMoreResult.course.users,
            edges: [...prevResult.course.users.edges, ...fetchMoreResult.course.users.edges],
            pageInfo: fetchMoreResult.course.users.pageInfo,
          }
        }
        return {
          course: course,
          userConnection: course.users
        };
      },
    }).catch(_error => setLoadingMore(false));
  };

  useInfiniteScroll(loadMore, true);

  const users = data?.course?.users;
  const incialLoading = networkStatus != 3 && networkStatus != 7;
  
  return {
    course: data?.course,
    userConnection: users,
    loading: incialLoading,
    loadingMore,
    error
  }
}

export default useGetCourseUsers;
