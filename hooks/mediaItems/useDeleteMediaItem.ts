import { useMutation } from "@apollo/client";
import { DELETE_MEDIA_ITEM } from "../../graphql/mutations/mediaItem/DELETE_MEDIA_ITEM";
import { DeleteMediaItem, DeleteMediaItemVariables } from "../../graphql/mutations/mediaItem/__generated__/DeleteMediaItem";
import { GET_MEDIA_ITEMS, MediaItemFragment } from "../../graphql/queries/mediaItems";

function useDeleteMediaItem() {

  const [deleteMediaItemMutation, deleteMediaItemResponse] = useMutation<DeleteMediaItem, DeleteMediaItemVariables>(
    DELETE_MEDIA_ITEM,
    {
      refetchQueries: [GET_MEDIA_ITEMS]
    }
  )

  const deleteMediaItem = (id) => {
    deleteMediaItemMutation({
      variables: { 
        id
      },
      optimisticResponse: {
        deleteMediaItem: {
          __typename: 'DeleteMediaItemPayload',
          mediaItem: {
            __typename: 'MediaItem',
            id,
            // _deleted: true,
          },
          message: ''
        },
      },
    })
  }

      
  return {
    deleteMediaItem,
  }
}

export default useDeleteMediaItem
