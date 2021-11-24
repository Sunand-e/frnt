import { useQuery, useReactiveVar } from "@apollo/client"
import { mediaItemsVar } from "../../graphql/cache"
import { GET_MEDIA_ITEMS } from "../../graphql/queries/allQueries";
import { GetMediaItems } from "../../graphql/queries/__generated__/GetMediaItems";
import MediaItem from "./MediaItem"

const MediaLibrary = () => {

  const { loading, error, data: { mediaItems } = {} } = useQuery<GetMediaItems>(GET_MEDIA_ITEMS, {
    variables: { 
      where: {
        media_type: [0,1,2,3]
      }
    }
  })

  if (loading) return <>Loading...</>
  if (error) return <>`Error! ${error}`</>
  console.log('mediaItems')
  console.log(mediaItems)

  return (
    <>
    <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
      {mediaItems.map((file, idx) => <MediaItem key={idx} file={file} />)}
    </ul>
    </>
  )
}

export default MediaLibrary