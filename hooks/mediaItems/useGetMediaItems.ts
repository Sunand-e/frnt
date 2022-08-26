import { GET_MEDIA_ITEMS } from "../../graphql/queries/mediaItems"
import { useQuery } from "@apollo/client"
import { GetMediaItems } from "../../graphql/queries/__generated__/GetMediaItems";

function useGetMediaItems() {

    const { loading, error, data: { mediaItems: mediaItems } = {} } = useQuery<GetMediaItems>(GET_MEDIA_ITEMS);

    return {
        mediaItems,
        loading,
        error
    }
}

export default useGetMediaItems
