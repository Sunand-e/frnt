import { UpdateMediaItem, UpdateMediaItemVariables } from "../../graphql/mutations/mediaItem/__generated__/UpdateMediaItem";
import { UPDATE_MEDIA_ITEM } from "../../graphql/mutations/mediaItem/UPDATE_MEDIA_ITEM"
import { GET_MEDIA_ITEM } from "../../graphql/queries/mediaItems"
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"

function useUpdateMediaItem(id = null) {

    const { loading, error, data: {mediaItem} = {} } = useQuery(
        GET_MEDIA_ITEM,
        {
            variables: {
                id
            }
        }
    );

    const [updateMediaItemMutation, updateMediaItemResponse] = useMutation<UpdateMediaItem, UpdateMediaItemVariables>(
        UPDATE_MEDIA_ITEM
    );

    const updateMediaItem = (values, cb = null) => {
        // const updateMediaItem = ({name=null, contentBlocks=null}) => {
        const variables = {
            ...values
        }

        updateMediaItemMutation({
            variables: {
                id,
                ...variables
            },
            optimisticResponse: {
                updateMediaItem: {
                    __typename: 'UpdateMediaItemPayload',
                    mediaItem: {
                        ...mediaItem,
                        ...variables
                    },
                }
            },
            onCompleted: cb
        }).catch(res => {
            // : do something if there is an error!!
        })
    }

    return {
        mediaItem,
        loading,
        error,
        updateMediaItem
    }
}

export default useUpdateMediaItem
