import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries/users";
import { GetUsers } from "../../graphql/queries/__generated__/GetUsers";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import useInfiniteScroll from "../useInfiniteScroll";

function useGetUsers({ pagination = false } = {}) {
  const { loading, error, data, fetchMore, refetch } = useQuery<GetUsers>(GET_USERS, {
    variables: pagination ? { first: ITEMS_PER_PAGE, after: null } : {},
  });

  const loadMore = () => {
    if (loading || !pagination || !data?.users?.pageInfo?.hasNextPage) return;
    
    fetchMore({
      variables: { after: data.users.pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult?.users || prevResult.users.pageInfo.endCursor == fetchMoreResult.users.pageInfo.endCursor) return prevResult;

        return {
          users: {
            ...fetchMoreResult.users,
            edges: [...prevResult.users.edges, ...fetchMoreResult.users.edges],
            pageInfo: fetchMoreResult.users.pageInfo,
          },
        };
      },
    }).catch(error => console.error("FetchMore Error:", error));
  };

  useInfiniteScroll(loadMore, pagination);

  return {
    users: data?.users,
    loading,
    error,
    loadMore,
    refetchUsers: refetch
  };
}

export default useGetUsers;
