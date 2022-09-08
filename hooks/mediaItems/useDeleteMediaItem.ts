import { useMutation } from "@apollo/client";
import { DELETE_MEDIA_ITEM } from "../../graphql/mutations/mediaItem/DELETE_MEDIA_ITEM";
import { DeleteMediaItem, DeleteMediaItemVariables } from "../../graphql/mutations/mediaItem/__generated__/DeleteMediaItem";
import { GET_MEDIA_ITEMS } from "../../graphql/queries/mediaItems";

function useDeleteMediaItem() {

  const [deleteMediaItemMutation, deleteMediaItemResponse] = useMutation<DeleteMediaItem, DeleteMediaItemVariables>(
    DELETE_MEDIA_ITEM,
    {
      refetchQueries: [GET_MEDIA_ITEMS]
    }
  )

  const deleteMediaItem = async (id) => {
    const response = await deleteMediaItemMutation({
      variables: { 
        id
      },
    })
    if (!response.data) {
      throw new Error(`HTTP error: ${response.errors}`);
    }
    return response.data;
  }

      
  return {
    deleteMediaItem,
    deleteMediaItemResponse
  }
}

export default useDeleteMediaItem
