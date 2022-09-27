import { CREATE_LIBRARY_ITEM } from "../../graphql/mutations/libraryItem/CREATE_LIBRARY_ITEM"
import { GET_LIBRARY_ITEMS } from "../../graphql/queries/allQueries"
import { useMutation } from "@apollo/client"
import { GetLibraryItems } from "../../graphql/queries/__generated__/GetLibraryItems";
import { CreateLibraryItem, CreateLibraryItemVariables } from "../../graphql/mutations/libraryItem/__generated__/CreateLibraryItem";
import { useEffect, useState } from "react";


function useCreateResource() {

  const [createResourceMutation, createResourceResponse] = useMutation<CreateLibraryItem, CreateLibraryItemVariables>(
    CREATE_LIBRARY_ITEM,
    {
      // the update function updates the list of libraryItems returned from the cached query.
      // This runs twice - once after the optimistic response, and again after the server response.
      update(cache, { data: { createLibraryItem } } ) {
        const cachedData = cache.readQuery<GetLibraryItems>({
          query: GET_LIBRARY_ITEMS
        })
        cache.writeQuery({
          query: GET_LIBRARY_ITEMS,
          data: {
            ...cachedData,
            libraryItems: {
              ...cachedData.libraryItems,
              edges: [{node: createLibraryItem.libraryItem}, ...cachedData.libraryItems.edges]
            }            
          }
        })
      },
    }
  );

  const [libraryItem, setLibraryItem] = useState(null)
  useEffect(() => {
    if(createResourceResponse.data) {
      setLibraryItem(createResourceResponse.data.createLibraryItem.libraryItem)
    }
  }, [createResourceResponse.data])

  const createLibraryItem = (values, cb = null) => {
    console.log('values')
    console.log(values)
    createResourceMutation({
      variables: { 
        ...values
      },
      optimisticResponse: {
        createLibraryItem: {
          __typename: 'CreateLibraryItemPayload',
          libraryItem: {
            __typename: 'ContentItem',
            id: `tmp-${Math.floor(Math.random() * 10000)}`,
            title: values.title || '',
            settings: {},
            createdAt: '',
            updatedAt: '',
            content: {},
            shared: false,
            contentType: null,
            itemType: 'libraryItem',
            mediaItem: null,
            image: null,
            icon: null,
            prerequisites: null,
            _deleted: false,
            users: { totalCount: 0 },
            tags: [],
            ...values
          },
          message: ''
        }
      },
      onCompleted: cb
      // refetchQueries: [{ query: GET_LIBRARY_ITEM }]
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    resource: libraryItem,
    createResource: createLibraryItem
  }
}

export default useCreateResource