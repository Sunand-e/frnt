import { CREATE_LIBRARY_ITEM } from "../../graphql/mutations/libraryItem/CREATE_LIBRARY_ITEM"
import { GET_LIBRARY_ITEMS } from "../../graphql/queries/allQueries"
import { useMutation } from "@apollo/client"
import { GetLibraryItems } from "../../graphql/queries/__generated__/GetLibraryItems";
import { CreateLibraryItem, CreateLibraryItemVariables } from "../../graphql/mutations/libraryItem/__generated__/CreateLibraryItem";
import { useEffect, useState } from "react";


function useCreateResource() {

  const [createLibraryItemMutation, createLibraryItemResponse] = useMutation<CreateLibraryItem, CreateLibraryItemVariables>(
    CREATE_LIBRARY_ITEM,
    {
      // the update function updates the list of libraryItems returned from the cached query.
      // This runs twice - once after the optimistic response, and again after the server response.
      update(cache, { data: { createLibraryItem } } ) {

        const data = cache.readQuery<GetLibraryItems>({
          query: GET_LIBRARY_ITEMS
        })
        
        if(createLibraryItem.libraryItem.id.indexOf('tmp-') !== 0) {        
          // closeModal()
          // router.push({
          //   pathname: `/admin/library/edit`,
          //   query: {
          //     id: createLibraryItem.libraryItem.id
          //   }
          // })
        }
      },
    }
  );

  const [libraryItem, setLibraryItem] = useState(null)
  useEffect(() => {
    if(createLibraryItemResponse.data) {
      setLibraryItem(createLibraryItemResponse.data.createLibraryItem.libraryItem)
    }

  }, [createLibraryItemResponse.data])

  const createLibraryItem = (values, cb) => {
    createLibraryItemMutation({
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
            contentType: null,
            itemType: 'lesson',
            image: null,
            icon: null,
            prerequisites: null,
            _deleted: false,
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