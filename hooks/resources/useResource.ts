import { useRef, useEffect } from "react";
import { UpdateLibraryItem, UpdateLibraryItemVariables } from "../../graphql/mutations/libraryItem/__generated__/UpdateLibraryItem";
import { UPDATE_LIBRARY_ITEM } from "../../graphql/mutations/libraryItem/UPDATE_LIBRARY_ITEM"
import { LibraryItemFragment, GET_LIBRARY_ITEM } from "../../graphql/queries/allQueries"
import { LibraryItemFragment as LibraryItemFragmentType } from '../../graphql/queries/__generated__/LibraryItemFragment';
import { useMutation, useQuery } from "@apollo/client"
import cache from "../../graphql/cache"


function useResource(id=null) {

  const { loading, error, data: {libraryItem: resource} = {} } = useQuery(
    GET_LIBRARY_ITEM,
    {
      variables: {
        id
      },
      skip: !id
    }
  );

  const [updateLibraryItemMutation, updateLibraryItemResponse] = useMutation<UpdateLibraryItem, UpdateLibraryItemVariables>(
    UPDATE_LIBRARY_ITEM
  );

  const updateResource = (id) => (values) => {

    const cachedResource = cache.readFragment<LibraryItemFragmentType>({
      id:`ContentItem:${id}`,
      fragment: LibraryItemFragment,
      fragmentName: 'LibraryItemFragment',
    })
    
    updateLibraryItemMutation({
      variables: {
        id,
        ...values
      },
      optimisticResponse: {
        updateLibraryItem: {
          __typename: 'UpdateLibraryItemPayload',
          libraryItem: {
            ...cachedResource,
            ...values
          },
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }
  
  const updateResourceContentBlocks = (contentBlocks) => {
    updateResource({
      content: {
        blocks: contentBlocks 
      }
    })
  }

  return {
    resource,
    loading,
    error,
    updateResource,
    updateResourceContentBlocks
  }
}

export default useResource