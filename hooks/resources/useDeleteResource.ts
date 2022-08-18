import { useMutation } from "@apollo/client";
import { DELETE_LIBRARY_ITEM } from "../../graphql/mutations/libraryItem/DELETE_LIBRARY_ITEM";
import { DeleteLibraryItem } from "../../graphql/mutations/libraryItem/__generated__/DeleteLibraryItem";
import { LibraryItemFragment } from "../../graphql/queries/allQueries";


const useDeleteResource = () => {

  const [deleteLibraryItemMutation, { data: deletedData }] = useMutation<DeleteLibraryItem>(DELETE_LIBRARY_ITEM);

  const deleteLibraryItem = (id) => {

    deleteLibraryItemMutation({
      variables: { 
        id
      },
      optimisticResponse: {
        // __typename: 'Mutation',
        deleteLibraryItem: {
          __typename: 'DeleteContentItemPayload',
          contentItem: {
            id,
            __typename: 'ContentItem',
            _deleted: true,
          },
          message: ''
        },
      },

      update(cache, { data: deleteLibraryItem }) {
        // We get a single item.
        const libraryItem = cache.readFragment({
          id: `ContentItem:${id}`,
          fragment: LibraryItemFragment,
          fragmentName: 'LibraryItemFragment',
        });
        // Then, we update it.
        if (libraryItem) {
          cache.writeFragment({
            id: `ContentItem:${id}`,
            fragment: LibraryItemFragment,
            fragmentName: 'LibraryItemFragment',
            data: {
              ...libraryItem,
              _deleted: true
            },
          });
        }
      }
    })
  }

  return {
    deleteResource: deleteLibraryItem
  }
}

export default useDeleteResource