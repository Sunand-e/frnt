import { useQuery } from "@apollo/client";
import { GET_COURSES } from "../../graphql/queries/courses/courses";
import { GetCourses } from "../../graphql/queries/__generated__/GetCourses";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import useInfiniteScroll from "../useInfiniteScroll";
import { useCallback } from "react";
import { FilterParams, useReLoad } from "../useReLoad";

function useGetCourses({ pagination = false } = {}) {
  const defaultfilters = {
    globalFilter: "",
    orderField: "order",
    orderDirection: "asc",
  };

  const getWhereConditions = (updatedFilters: any) => {
    const where: any = {};
    if (updatedFilters.globalFilter) where.title = updatedFilters.globalFilter;
    if (updatedFilters.categoryId) where.tagId = updatedFilters.categoryId;
    if (updatedFilters.collectionId) where.collectionId = updatedFilters.collectionId;
    if (updatedFilters.status) where.status = updatedFilters.status;
    return where;
  };

  const { loading, error, data, fetchMore, refetch } = useQuery<GetCourses>(GET_COURSES, {
    variables: {
      first: pagination ? ITEMS_PER_PAGE : undefined,
      after: null,
      orderBy: pagination ? [{ field: defaultfilters.orderField, direction: defaultfilters.orderDirection }] : undefined,
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  const loadMore = useCallback(() => {
    if (loading || !pagination || !data?.courses?.pageInfo?.hasNextPage) {
      return;
    }

    fetchMore({
      variables: {
        after: data.courses.pageInfo.endCursor
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
  }, [loading, pagination, data, fetchMore]);

  const reLoad = (params: FilterParams = {}) => {
    useReLoad(refetch, defaultfilters, params, getWhereConditions);
  };

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
