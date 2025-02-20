import { useQuery } from "@apollo/client";
import { GET_RESOURCES } from "../../graphql/queries/allQueries";
import { GetResources } from "../../graphql/queries/__generated__/GetResources";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import useInfiniteScroll from "../useInfiniteScroll";

function useGetResources({ pagination = false } = {}) {
  const { loading, error, data, fetchMore } = useQuery<GetResources>(GET_RESOURCES, {
    variables: pagination ? { first: ITEMS_PER_PAGE, after: null } : {},
  });

  const loadMore = () => {
    if (loading || !pagination || !data?.resources?.pageInfo?.hasNextPage) return;
    
    fetchMore({
      variables: { after: data.resources.pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult?.resources || prevResult.resources.pageInfo.endCursor == fetchMoreResult.resources.pageInfo.endCursor) return prevResult;

        return {
          resources: {
            ...fetchMoreResult.resources,
            edges: [...prevResult.resources.edges, ...fetchMoreResult.resources.edges],
            pageInfo: fetchMoreResult.resources.pageInfo,
          },
        };
      },
    }).catch(error => console.error("FetchMore Error:", error));
  };

  useInfiniteScroll(loadMore, pagination);

  return {
    resources: data?.resources,
    loading,
    error,
    loadMore
  };
}

export default useGetResources;
