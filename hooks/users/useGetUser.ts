
import { useQuery } from "@apollo/client"
import { GetUserQuery, GetUserQueryVariables, InputMaybe } from "../../graphql/generated";
import { GET_USER } from "../../graphql/queries/userDetails";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import useInfiniteScroll from "../useInfiniteScroll";
import { useState } from "react";

function useGetUser(id: InputMaybe<string> = null, query = GET_USER, pagination = false) {

  const [loadingMore, setLoadingMore] = useState(false);
  const { loading, error, data, fetchMore, networkStatus } = useQuery<GetUserQuery, GetUserQueryVariables>(query, {
    variables: pagination ? { id, first: ITEMS_PER_PAGE, after: null } : { id },
    skip: !id,
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true
  });

  const loadMoreCourses = () => {
    if (loading || !pagination || !data?.user.courses?.pageInfo?.hasNextPage) return;
    
    setLoadingMore(true);
    fetchMore({
      variables: { after: data.user.courses.pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        setLoadingMore(false);
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
    }).catch(_error => setLoadingMore(false));
  };

  useInfiniteScroll(loadMoreCourses, pagination);

  const incialLoading = networkStatus != 3 && networkStatus != 7;

  return { user: data?.user, loading: incialLoading, error, loadingMore}
}

export default useGetUser;
