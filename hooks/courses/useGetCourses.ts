import { useQuery } from "@apollo/client";
import { GET_COURSES } from "../../graphql/queries/courses/courses";
import { GetCourses } from "../../graphql/queries/__generated__/GetCourses";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import useInfiniteScroll from "../useInfiniteScroll";
import { useCallback, useRef, useState } from "react";
import { FilterParams, useReLoad } from "../useReLoad";

function useGetCourses({ pagination = false } = {}) {
  const [loadingMore, setLoadingMore] = useState(false);
  const abortController = useRef<AbortController | null>(null);

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

  const { loading, error, data, fetchMore, refetch, networkStatus, updateQuery} = useQuery<GetCourses>(GET_COURSES, {
    variables: {
      first: pagination ? ITEMS_PER_PAGE : undefined,
      after: null,
      orderBy: pagination ? [{ field: defaultfilters.orderField, direction: defaultfilters.orderDirection }] : undefined,
    },
    fetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true
  });

  const loadMore = useCallback(() => {
    if (loading || !pagination || !data?.courses?.pageInfo?.hasNextPage) return;

    setLoadingMore(true);
    abortController.current = new AbortController();
    fetchMore({
      variables: {
        after: data.courses.pageInfo.endCursor
      },
      context: {
        fetchOptions: {
          signal: abortController.current.signal, // Pass the abort signal to the request
        },
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        setLoadingMore(false);
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
    }).catch(_error => setLoadingMore(false));
  }, [loading, pagination, data, fetchMore]);

  const reLoad = (params: FilterParams = {}) => {
    if (loadingMore && abortController.current) {
      abortController.current.abort(); // Abort the ongoing fetchMore
      setLoadingMore(false);
    }

    useReLoad<GetCourses>(refetch, defaultfilters, params, getWhereConditions, GET_COURSES, updateQuery);
  };

  useInfiniteScroll(loadMore, pagination);

  const incialLoading = networkStatus != 3 && networkStatus != 7;

  return {
    courses: data?.courses,
    loading: incialLoading,
    loadingMore,
    error,
    reLoad,
  };
}

export default useGetCourses;
