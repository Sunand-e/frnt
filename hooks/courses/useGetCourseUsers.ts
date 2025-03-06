import { useQuery } from "@apollo/client"
import { GET_COURSE_USERS } from "../../graphql/queries/courses/courseUsers";
import { GetCourseUsers } from "../../graphql/queries/courses/__generated__/GetCourseUsers";
import useInfiniteScroll from "../useInfiniteScroll";
import { ITEMS_PER_PAGE } from "../../utils/constants";

function useGetCourseUsers(id: any) {

  const { loading, error, data, fetchMore, refetch } = useQuery<GetCourseUsers>(GET_COURSE_USERS, {
    variables: { id, first: ITEMS_PER_PAGE, after: null },
    skip: !id
  });

  const loadMore = () => {
    if (loading || !data?.course.users?.pageInfo?.hasNextPage) return;
    
    fetchMore({
      variables: { after: data.course.users.pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
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
    }).catch(error => console.error("FetchMore Error:", error));
  };

  useInfiniteScroll(loadMore, true);

  const users = data?.course?.users
  
  return {
    course: data?.course,
    userConnection: users,
    loading,
    error
  }
}

export default useGetCourseUsers;
