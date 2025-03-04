import { useQuery } from "@apollo/client";
import { GET_RESOURCES } from "../../graphql/queries/allQueries";
import { GetResources } from "../../graphql/queries/__generated__/GetResources";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import useInfiniteScroll from "../useInfiniteScroll";
import { useState, useEffect, useCallback } from "react";

function useGetResources({ pagination = false, remote = false } = {}) {
  const [filters, setFilters] = useState({
    tagId: "",
    collectionId: "",
    globalFilter: "",
    orderField: "order",
    orderDirection: "asc",
  });


  const getWhereConditions = (): { title?: string; tagId?: string; collectionId?: string } => {
    const where: { title?: string; tagId?: string; collectionId?: string } = {};
    if (filters.globalFilter) where.title = filters.globalFilter;
    if (filters.tagId) where.tagId = filters.tagId;
    if (filters.collectionId) where.collectionId = filters.collectionId;
    return where;
  };

  const getOrderField = () => {
    if (!remote) return "order";
    return filters.orderField === "order" ? "custom_order" : filters.orderField || "created_at";
  };

  const { loading, error, data, fetchMore, refetch } = useQuery<GetResources>(GET_RESOURCES, {
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
    if (loading || !pagination || !data?.resources?.pageInfo?.hasNextPage) return;

    fetchMore({
      variables: {
        first: ITEMS_PER_PAGE,
        after: data.resources.pageInfo.endCursor,
        where: getWhereConditions(),
        orderBy: remote ? [{ field: getOrderField(), direction: filters.orderDirection }] : undefined,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult?.resources || prevResult.resources.pageInfo.endCursor === fetchMoreResult.resources.pageInfo.endCursor) return prevResult;
        return {
          resources: {
            ...fetchMoreResult.resources,
            edges: [...prevResult.resources.edges, ...fetchMoreResult.resources.edges],
            pageInfo: fetchMoreResult.resources.pageInfo,
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
    resources: data?.resources,
    loading,
    error,
    loadMore,
    reLoad,
    changeOrder,
  };
}

export default useGetResources;
