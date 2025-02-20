import { useQuery } from "@apollo/client";
import { GET_PATHWAYS } from "../../graphql/queries/allQueries";
import { GetPathways } from "../../graphql/queries/__generated__/GetPathways";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import useInfiniteScroll from "../useInfiniteScroll";

function useGetPathways({ pagination = false } = {}) {
  const { loading, error, data, fetchMore } = useQuery<GetPathways>(GET_PATHWAYS, {
    variables: pagination ? { first: ITEMS_PER_PAGE, after: null } : {},
  });

  const loadMore = () => {
    if (loading || !pagination || !data?.pathways?.pageInfo?.hasNextPage) return;
    
    fetchMore({
      variables: { after: data.pathways.pageInfo.endCursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult?.pathways || prevResult.pathways.pageInfo.endCursor == fetchMoreResult.pathways.pageInfo.endCursor) return prevResult;

        return {
          pathways: {
            ...fetchMoreResult.pathways,
            edges: [...prevResult.pathways.edges, ...fetchMoreResult.pathways.edges],
            pageInfo: fetchMoreResult.pathways.pageInfo,
          },
        };
      },
    }).catch(error => console.error("FetchMore Error:", error));
  };

  useInfiniteScroll(loadMore, pagination);

  return {
    pathways: data?.pathways,
    loading,
    error,
    loadMore
  };
}

export default useGetPathways;
