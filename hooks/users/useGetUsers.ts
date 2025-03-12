import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries/users";
import { GetUsers } from "../../graphql/queries/__generated__/GetUsers";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import useInfiniteScroll from "../useInfiniteScroll";
import { useCallback } from "react";
import { FilterParams, useReLoad } from "../useReLoad";

function useGetUsers({ pagination = false, remote = false } = {}) {
  const defaultfilters = {
    globalFilter: "",
    orderField: "firstName",
    orderDirection: "asc",
  };

  const getWhereConditions = (updatedFilters: any) => {
    const where: Record<string, any> = {};
    if (updatedFilters.globalFilter){
      where.globalFilter = updatedFilters.globalFilter;
    }
    return where;
  };

  const { loading, error, data, fetchMore, refetch } = useQuery<GetUsers>(GET_USERS, {
    variables: {
      first: pagination ? ITEMS_PER_PAGE : undefined,
      after: null,
      orderBy: pagination ? [{ field: defaultfilters.orderField, direction: defaultfilters.orderDirection }] : undefined,
    },
    fetchPolicy: "network-only"
  });

  const loadMore = useCallback(() => {
    if (loading || !pagination || !data?.users?.pageInfo?.hasNextPage) return;

    fetchMore({
      variables: {
        after: data.users.pageInfo.endCursor
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult?.users || prevResult.users.pageInfo.endCursor === fetchMoreResult.users.pageInfo.endCursor) return prevResult;
        return {
          users: {
            ...fetchMoreResult.users,
            edges: [...prevResult.users.edges, ...fetchMoreResult.users.edges],
            pageInfo: fetchMoreResult.users.pageInfo,
          },
        };
      },
    }).catch((error) => console.error("FetchMore Error:", error));
  }, [loading, pagination, data, fetchMore]);
  
  const reLoad = (params: FilterParams = {}) => {
    useReLoad(refetch, defaultfilters, params, getWhereConditions);
  };
  
  useInfiniteScroll(loadMore, pagination);

  return {
    users: data?.users,
    loading,
    error,
    loadMore,
    reLoad,
  };
}

export default useGetUsers;
