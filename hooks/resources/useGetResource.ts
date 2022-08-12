import { useRef, useEffect } from "react";
import { UpdateLibraryItem, UpdateLibraryItemVariables } from "../../graphql/mutations/libraryItem/__generated__/UpdateLibraryItem";
import { UPDATE_LIBRARY_ITEM } from "../../graphql/mutations/libraryItem/UPDATE_LIBRARY_ITEM"
import { LibraryItemFragment, GET_LIBRARY_ITEM } from "../../graphql/queries/allQueries"
import { LibraryItemFragment as LibraryItemFragmentType } from '../../graphql/queries/__generated__/LibraryItemFragment';
import { useMutation, useQuery } from "@apollo/client"
import cache from "../../graphql/cache"


function useGetResource(id=null) {

  const { loading, error, data: {libraryItem} = {} } = useQuery(
    GET_LIBRARY_ITEM,
    {
      variables: {
        id
      }
    }
  );

  return {
    libraryItem,
    loading,
    error,
  }
}

export default useGetResource