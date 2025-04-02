import { client } from "../graphql/client";
import { ITEMS_PER_PAGE } from "../utils/constants";
import isEqual from 'lodash/isEqual';

export type FilterParams = {
  categoryId?: string,
  collectionId?: string,
  globalFilter?: string;
  orderField?: string;
  orderDirection?: string;
  status?: string;
};

export const useReLoad = <TData = any>(refetch: any, defaultFilters: any, params: FilterParams = {}, getWhereConditions: (_updatedFilters: any) => void, query: any, updateQuery: any) => {
  const updatedFilters = { ...defaultFilters, ...params };

  if (isEqual(getWhereConditions(defaultFilters), getWhereConditions(updatedFilters))) {
    const cachedData = client.readQuery<TData>({
      query: query,
      variables: {
        first: ITEMS_PER_PAGE,
        after: null,
        where: getWhereConditions(updatedFilters),
        orderBy: [{ field: updatedFilters.orderField, direction: updatedFilters.orderDirection }],
      },
    });

    if (cachedData) {
      updateQuery(() => ({
        ...cachedData
      }));
    }
    else {
      networkFetch(refetch, getWhereConditions(updatedFilters), updatedFilters)
    }
  }
  else {
    networkFetch(refetch, getWhereConditions(updatedFilters), updatedFilters)
  }
};

const networkFetch = (refetch: any, where: any, updatedFilters: any) => {
  refetch({
    first: ITEMS_PER_PAGE,
    after: null,
    where: where,
    orderBy: [{ field: updatedFilters.orderField, direction: updatedFilters.orderDirection }],
  });
};
