import { useQuery } from "@apollo/client";
import { GET_RESOURCES } from "../../graphql/queries/allQueries";
import { GetResources } from "../../graphql/queries/__generated__/GetResources";

function useGetResources() {
  const { loading, error, data, fetchMore } = useQuery<GetResources>(GET_RESOURCES, {
    variables: { first: 20, after: null }, // Initial fetch of 20 resources
  });

  const loadMore = () => {
    if (data?.resources?.pageInfo?.hasNextPage) {
      fetchMore({
        variables: { after: data.resources.pageInfo.endCursor },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult?.resources) return prevResult;

          return {
            resources: {
              ...fetchMoreResult.resources,
              edges: [
                ...prevResult.resources.edges,
                ...fetchMoreResult.resources.edges, // Append new results
              ],
              pageInfo: fetchMoreResult.resources.pageInfo,
            },
          };
        },
      }).catch((error) => console.error("FetchMore Error:", error));
    }
  };

  return {
    resources: data?.resources,
    loading,
    error,
    loadMore,
    hasMore: data?.resources?.pageInfo?.hasNextPage || false, // Whether more resources are available
  };
}

export default useGetResources;
