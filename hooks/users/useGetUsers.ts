import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/queries/users";
import { GetUsers } from "../../graphql/queries/__generated__/GetUsers";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import useInfiniteScroll from "../useInfiniteScroll";
import { useState, useEffect, useCallback } from "react";

function useGetUsers({ pagination = false, remote = false } = {}) {
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    orderField: "firstName",
    orderDirection: "asc",
  });

  const getWhereConditions = () => {
    const where: Record<string, any> = {};
    if (filters.firstName) where.firstName = filters.firstName;
    if (filters.lastName) where.lastName = filters.lastName;
    if (filters.email) where.email = filters.email;
    console.log("Where Conditions:", where);
    return where;
  };

  const getOrderField = () => {
    return remote ? filters.orderField || "createdAt" : "order";
  };

  const { loading, error, data, fetchMore, refetch } = useQuery<GetUsers>(GET_USERS, {
    variables: {
      first: pagination ? ITEMS_PER_PAGE : undefined,
      after: null,
      where: getWhereConditions(),
      orderBy: remote ? [{ field: getOrderField(), direction: filters.orderDirection }] : undefined,
    },
    fetchPolicy: "network-only",
    onCompleted: (data) => console.log("Fetched Users:", data),
  });

  const changeOrder = (field: string) => {
    setFilters((prev) => {
      const newDirection = prev.orderDirection === "asc" ? "desc" : "asc";
      return { ...prev, orderField: field, orderDirection: newDirection };
    });

    setTimeout(() => {
      if (remote) {
        refetch({
          first: pagination ? ITEMS_PER_PAGE : undefined,
          after: null,
          where: getWhereConditions(),
          orderBy: [{ field, direction: filters.orderDirection }],
        }).catch((error) => console.error("Refetch Error:", error));
      }
    }, 0);
  };

  const loadMore = useCallback(() => {
    if (loading || !pagination || !data?.users?.pageInfo?.hasNextPage) return;

    fetchMore({
      variables: {
        first: ITEMS_PER_PAGE,
        after: data.users.pageInfo.endCursor,
        where: getWhereConditions(),
        orderBy: remote ? [{ field: getOrderField(), direction: filters.orderDirection }] : undefined,
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
  }, [loading, pagination, data, fetchMore, filters]);

  const reLoad = (firstName = "", lastName = "", email = "") => {
    setFilters((prev) => ({ ...prev, firstName, lastName, email }));
  };

  useEffect(() => {
    if (remote) {
      console.log("Refetching with filters:", filters);
      refetch({
        first: pagination ? ITEMS_PER_PAGE : undefined,
        after: null,
        where: getWhereConditions(),
        orderBy: [{ field: getOrderField(), direction: filters.orderDirection }],
      }).catch((error) => console.error("Refetch Error:", error));
    }
  }, [filters, remote, pagination]);

  useInfiniteScroll(loadMore, pagination);

  return {
    users: data?.users,
    loading,
    error,
    loadMore,
    reLoad,
    changeOrder,
  };
}

export default useGetUsers;
