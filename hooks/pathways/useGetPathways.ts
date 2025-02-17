import { useQuery } from "@apollo/client";
import { GET_PATHWAYS } from "../../graphql/queries/allQueries";
import { GetPathways } from "../../graphql/queries/__generated__/GetPathways";

function useGetPathways() {
  const { loading, error, data, fetchMore } = useQuery<GetPathways>(GET_PATHWAYS, {
    variables: { first: 20, after: null },
  });


  const loadMore = () => {
    if (data?.pathways?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: { after: data.pathways.pageInfo.endCursor },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult?.pathways) return prevResult;

          return {
            pathways: {
              ...fetchMoreResult.pathways,
              edges: [
                ...prevResult.pathways.edges,
                ...fetchMoreResult.pathways.edges,
              ],
              pageInfo: fetchMoreResult.pathways.pageInfo,
            },
          };
        },
      }).catch((error) => console.error("FetchMore Error:", error));
    }
  };

  return {
    pathways: data?.pathways,
    loading,
    error,
    loadMore,
    hasMore: data?.pathways?.pageInfo?.hasNextPage || false,
  };
}

export default useGetPathways;