
import { useQuery } from "@apollo/client"
import { GetUserQuery, GetUserQueryVariables, InputMaybe } from "../../graphql/generated";
import { GET_USER } from "../../graphql/queries/userDetails";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import useInfiniteScroll from "../useInfiniteScroll";

function useGetUser(id: InputMaybe<string> = null, query = GET_USER, pagination = false) {

  const { loading, error, data, fetchMore } = useQuery<GetUserQuery, GetUserQueryVariables>(query, {
    variables: pagination ? { id, first: ITEMS_PER_PAGE, after: null } : { id },
    skip: !id
  });

  const loadMoreCourses = () => {
    if (loading || !pagination || !data?.user.courses?.pageInfo?.hasNextPage) return;
  
    fetchMore({
      variables: { after: data.user.courses.pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (
          !fetchMoreResult?.user.courses ||
          prevResult.user.courses.pageInfo.endCursor === fetchMoreResult.user.courses.pageInfo.endCursor
        ) return prevResult;
  
        return {
          user: {
            ...prevResult.user,
            courses: {
              ...fetchMoreResult.user.courses,
              edges: [...prevResult.user.courses.edges, ...fetchMoreResult.user.courses.edges],
              pageInfo: fetchMoreResult.user.courses.pageInfo,
            },
          },
        };
      },
    }).catch(error => console.error("FetchMore Error:", error));
  };

  useInfiniteScroll(loadMoreCourses, pagination);

  return { user: data?.user, loading, error }
}

export default useGetUser;
