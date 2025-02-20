import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries/users";
import { GetUsers } from "../../graphql/queries/__generated__/GetUsers";
import { ITEMS_PER_PAGE } from "../../utils/constants";

function useGetUsers() {
  const { loading, error, data, fetchMore, refetch } = useQuery<GetUsers>(GET_USERS, {
    variables: { first: ITEMS_PER_PAGE, after: null },
  });

  const loadMore = () => {
    if (data?.users?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: { after: data.users.pageInfo.endCursor },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult?.users) return prevResult;

          return {
            users: {
              ...fetchMoreResult.users,
              edges: [...prevResult.users.edges, ...fetchMoreResult.users.edges],
              pageInfo: fetchMoreResult.users.pageInfo,
            },
          };
        },
      }).catch((error) => console.error("FetchMore Error:", error));
    }
  };

  return {
    users: data?.users?.edges.map((edge) => edge.node) || [],
    loading,
    error,
    loadMore,
    refetchUsers: refetch
  };
}

export default useGetUsers;
