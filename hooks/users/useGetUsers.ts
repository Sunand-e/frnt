import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries/users";
import { GetUsers } from "../../graphql/queries/__generated__/GetUsers";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import useInfiniteScroll from "../useInfiniteScroll";
import { useCallback, useRef, useState } from "react";
import { FilterParams, useReLoad } from "../useReLoad";

function useGetUsers({ pagination = false} = {}) {
  const [loadingMore, setLoadingMore] = useState(false);
  const abortController = useRef<AbortController | null>(null);

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

  const { loading, error, data, fetchMore, refetch, networkStatus, updateQuery} = useQuery<GetUsers>(GET_USERS, {
    variables: {
      first: pagination ? ITEMS_PER_PAGE : undefined,
      after: null,
      orderBy: pagination ? [{ field: defaultfilters.orderField, direction: defaultfilters.orderDirection }] : undefined,
    },
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true
  });

  const loadMore = useCallback(() => {
    if (loading || !pagination || !data?.users?.pageInfo?.hasNextPage) return;

    setLoadingMore(true);
    abortController.current = new AbortController();
    fetchMore({
      variables: {
        after: data.users.pageInfo.endCursor
      },
      context: {
        fetchOptions: {
          signal: abortController.current.signal, // Pass the abort signal to the request
        },
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        setLoadingMore(false);
        if (!fetchMoreResult?.users || prevResult.users.pageInfo.endCursor === fetchMoreResult.users.pageInfo.endCursor) return prevResult;
        return {
          users: {
            ...fetchMoreResult.users,
            edges: [...prevResult.users.edges, ...fetchMoreResult.users.edges],
            pageInfo: fetchMoreResult.users.pageInfo,
          },
        };
      },
    }).catch((_error) => setLoadingMore(false));
  }, [loading, pagination, data, fetchMore]);
  
  const reLoad = (params: FilterParams = {}) => {
    if (loadingMore && abortController.current) {
      abortController.current.abort(); // Abort the ongoing fetchMore
      setLoadingMore(false);
    }

    useReLoad<GetUsers>(refetch, defaultfilters, params, getWhereConditions, GET_USERS, updateQuery);
  };
  
  useInfiniteScroll(loadMore, pagination);

  const incialLoading = networkStatus != 3 && networkStatus != 7;

  return {
    users: data?.users,
    loading: incialLoading,
    loadingMore,
    error,
    reLoad,
  };
}

export default useGetUsers;
