import { useQuery } from "@apollo/client";
import { GET_PATHWAYS } from "../../graphql/queries/allQueries";
import { GetPathways } from "../../graphql/queries/__generated__/GetPathways";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import useInfiniteScroll from "../useInfiniteScroll";
import { useState, useEffect, useCallback } from "react";

function useGetPathways({ pagination = false, remote = false } = {}) {
  const [filters, setFilters] = useState({
    tagId: "",
    collectionId: "",
    globalFilter: "",
    orderField: "order",
    orderDirection: "asc",
  });

  const getWhereConditions = (): Record<string, any> => {
    const where: Record<string, any> = {};
    if (filters.globalFilter) where.title = filters.globalFilter;
    return where;
  };

  const getOrderField = () => {
    if (!remote) return "order";
    return filters.orderField === "order" ? "custom_order" : filters.orderField || "created_at";
  };

  const { loading, error, data, fetchMore, refetch } = useQuery<GetPathways>(GET_PATHWAYS, {
    variables: {
      first: pagination ? ITEMS_PER_PAGE : undefined,
      after: null,
      where: getWhereConditions(),
      orderBy: remote ? [{ field: getOrderField(), direction: filters.orderDirection }] : undefined,
    },
    fetchPolicy: "network-only",
  });

  const changeOrder = (field: string) => {
    const newDirection = filters.orderDirection === "asc" ? "desc" : "asc";
    setFilters((prev) => ({ ...prev, orderField: field, orderDirection: newDirection }));

    if (remote) {
      refetch({
        first: pagination ? ITEMS_PER_PAGE : undefined,
        after: null,
        where: getWhereConditions(),
        orderBy: [{ field, direction: newDirection }],
      }).catch((error) => console.error("Refetch Error:", error));
    }
  };

  const loadMore = useCallback(() => {
    if (loading || !pagination || !data?.pathways?.pageInfo?.hasNextPage) return;

    fetchMore({
      variables: {
        first: ITEMS_PER_PAGE,
        after: data.pathways.pageInfo.endCursor,
        where: getWhereConditions(),
        orderBy: remote ? [{ field: getOrderField(), direction: filters.orderDirection }] : undefined,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult?.pathways || prevResult.pathways.pageInfo.endCursor === fetchMoreResult.pathways.pageInfo.endCursor) return prevResult;
        return {
          pathways: {
            ...fetchMoreResult.pathways,
            edges: [...prevResult.pathways.edges, ...fetchMoreResult.pathways.edges],
            pageInfo: fetchMoreResult.pathways.pageInfo,
          },
        };
      },
    }).catch((error) => console.error("FetchMore Error:", error));
  }, [loading, pagination, data, fetchMore, filters]);

  const reLoad = (tagId = "", collectionId = "", globalFilter = "") => {
    setFilters((prev) => ({ ...prev, tagId, collectionId, globalFilter }));
  };

  useEffect(() => {
    if (!loading && remote) {
      refetch({
        first: pagination ? ITEMS_PER_PAGE : undefined,
        after: null,
        where: getWhereConditions(),
        orderBy: [{ field: getOrderField(), direction: filters.orderDirection }],
      }).catch((error) => console.error("Refetch Error:", error));
    }
  }, [filters]);

  useInfiniteScroll(loadMore, pagination);

  return {
    pathways: data?.pathways,
    loading,
    error,
    loadMore,
    reLoad,
    changeOrder,
  };
}

export default useGetPathways;
