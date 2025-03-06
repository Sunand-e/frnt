import { useQuery } from "@apollo/client";
import { GET_COURSES } from "../../graphql/queries/courses/courses";
import { GetCourses } from "../../graphql/queries/__generated__/GetCourses";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import useInfiniteScroll from "../useInfiniteScroll";
import { useState, useEffect, useCallback } from "react";

function useGetCourses({ pagination = false, remote = false } = {}) {
  const [filters, setFilters] = useState({
    tagId: "",
    collectionId: "",
    globalFilter: "",
    orderField: "order",
    orderDirection: "asc",
  });

  console.log("Filters state:", filters);

  const getWhereConditions = () => {
    const where: any = {};
    if (filters.globalFilter) where.title = filters.globalFilter;
    if (filters.tagId) where.tagId = filters.tagId;
    if (filters.collectionId) where.collectionId = filters.collectionId;
    console.log("Generated where conditions:", where);
    return where;
  };

  const getOrderField = () => {
    if (!remote) {
      return "order";
    }
    const orderField = filters.orderField === "order" ? "custom_order" : filters.orderField || "created_at";
    return orderField;
  };

  console.log("Query variables:", {
    first: pagination ? ITEMS_PER_PAGE : undefined,
    after: null,
    where: getWhereConditions(),
    orderBy: remote ? [{ field: getOrderField(), direction: filters.orderDirection }] : undefined,
  });

  const { loading, error, data, fetchMore, refetch } = useQuery<GetCourses>(GET_COURSES, {
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
    console.log(`Changing order: field=${field}, newDirection=${newDirection}`);

    setFilters((prev) => ({
      ...prev,
      orderField: field,
      orderDirection: newDirection,
    }));

    if (remote) {
      console.log("Refetching with new order...");
      refetch({
        first: pagination ? ITEMS_PER_PAGE : undefined,
        after: null,
        where: getWhereConditions(),
        orderBy: [{ field, direction: newDirection }],
      }).catch(error => console.error("Refetch Error:", error));
    }
  };

  const loadMore = useCallback(() => {
    if (loading || !pagination || !data?.courses?.pageInfo?.hasNextPage) {
      return;
    }

    console.log("Fetching more data...");
    fetchMore({
      variables: {
        first: ITEMS_PER_PAGE,
        after: data.courses.pageInfo.endCursor,
        where: getWhereConditions(),
        orderBy: remote ? [{ field: getOrderField(), direction: filters.orderDirection }] : undefined,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult?.courses || prevResult.courses.pageInfo.endCursor === fetchMoreResult.courses.pageInfo.endCursor) {
          return prevResult;
        }

        console.log("New data fetched:", fetchMoreResult.courses);
        return {
          courses: {
            ...fetchMoreResult.courses,
            edges: [...prevResult.courses.edges, ...fetchMoreResult.courses.edges],
            pageInfo: fetchMoreResult.courses.pageInfo,
          },
        };
      },
    }).catch(error => console.error("FetchMore Error:", error));
  }, [loading, pagination, data, fetchMore, filters]);

  const reLoad = (tagId = "", collectionId = "", globalFilter = "") => {
    setFilters((prev) => ({
      ...prev,
      tagId,
      collectionId,
      globalFilter,
    }));
  };

  useEffect(() => {
    if (!loading && remote) {
      console.log("Effect triggered: refetching data");
      refetch({
        first: pagination ? ITEMS_PER_PAGE : undefined,
        after: null,
        where: getWhereConditions(),
        orderBy: [{ field: getOrderField(), direction: filters.orderDirection }],
      }).catch(error => console.error("Refetch Error:", error));
    }
  }, [filters]);

  useInfiniteScroll(loadMore, pagination);

  return {
    courses: data?.courses,
    loading,
    error,
    loadMore,
    reLoad,
    changeOrder,
  };
}

export default useGetCourses;
