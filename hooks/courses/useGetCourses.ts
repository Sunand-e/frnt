import { useQuery } from "@apollo/client";
import { GET_COURSES } from "../../graphql/queries/courses/courses";
import { GetCourses } from "../../graphql/queries/__generated__/GetCourses";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import useInfiniteScroll from "../useInfiniteScroll";
import { useState, useEffect, useCallback } from "react";

function useGetCourses({ pagination = false } = {}) {
  const [filters, setFilters] = useState({
    categoryId: "",
    collectionId: "",
    globalFilter: "",
  });


  const getWhereConditions = () => {
    const where: any = {};
    if (filters.globalFilter) where.title = filters.globalFilter;
    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.collectionId) where.collectionId = filters.collectionId;
    return where;
  };

  const { loading, error, data, fetchMore, refetch } = useQuery<GetCourses>(GET_COURSES, {
    variables: {
      first: pagination ? ITEMS_PER_PAGE : undefined,
      after: null,
      where: getWhereConditions(),
    },
    fetchPolicy: "network-only",
  });

  const loadMore = useCallback(() => {
    if (loading || !pagination || !data?.courses?.pageInfo?.hasNextPage) return;

    fetchMore({
      variables: {
        first: ITEMS_PER_PAGE,
        after: data.courses.pageInfo.endCursor,
        where: getWhereConditions(),
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult?.courses || prevResult.courses.pageInfo.endCursor === fetchMoreResult.courses.pageInfo.endCursor) {
          return prevResult;
        }

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

  const reLoad = (categoryId = "", collectionId = "", globalFilter = "") => {
    setFilters({ categoryId, collectionId, globalFilter });
  };

  useEffect(() => {
    if (!loading) {
      refetch({
        first: pagination ? ITEMS_PER_PAGE : undefined,
        after: null,
        where: getWhereConditions(),
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
  };
}

export default useGetCourses;

