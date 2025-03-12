import { ITEMS_PER_PAGE } from "../utils/constants";

export type FilterParams = {
  categoryId?: string,
  collectionId?: string, 
  globalFilter?: string;
  orderField?: string;
  orderDirection?: string;
  status?: string;
};

export const useReLoad = (refetch: any, defaultFilters: any, params: FilterParams = {}, getWhereConditions: (_updatedFilters: any) => void) => {
  const updatedFilters = { ...defaultFilters, ...params };

  refetch({
    first: ITEMS_PER_PAGE,
    after: null,
    where: getWhereConditions(updatedFilters),
    orderBy: [{ field: updatedFilters.orderField, direction: updatedFilters.orderDirection }],
  });
};
