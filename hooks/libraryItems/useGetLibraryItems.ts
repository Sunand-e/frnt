import { GET_LIBRARY_ITEMS } from "../../graphql/queries/allQueries"
import { useQuery } from "@apollo/client"
import { GetLibraryItems } from "../../graphql/queries/__generated__/GetLibraryItems";

function useGetLibraryItems() {

  const {loading, error, data: { libraryItems: libraryItems} = {} } = useQuery<GetLibraryItems>(
    GET_LIBRARY_ITEMS
  );

  return {
    libraryItems,
    loading,
    error
  }
}

export default useGetLibraryItems