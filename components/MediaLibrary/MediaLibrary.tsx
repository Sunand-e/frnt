import { useQuery, useReactiveVar } from "@apollo/client"
import { mediaItemsVar } from "../../graphql/cache"
import { GET_MEDIA_ITEMS } from "../../graphql/queries/allQueries";
import { GetMediaItems } from "../../graphql/queries/__generated__/GetMediaItems";
import FileUploader from "./FileUploader"
import MediaItem from "./MediaItem"

interface MediaLibraryProps {
  onItemSelect?: any
  typeFilter?: string[]
}

const MediaLibrary: React.FunctionComponent<MediaLibraryProps> = ({onItemSelect, typeFilter = ["image", "document", "video", "audio"]}) => {

  const { loading, error, data: { mediaItems } = {} } = useQuery<GetMediaItems>(GET_MEDIA_ITEMS, {
    variables: { 
      where: {
        media_type: typeFilter
      }
    }
  })

  if (loading) return <>Loading...</>
  if (error) return <>`Error! ${error}`</>

  return (
    <>
    <FileUploader />
      <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
        {mediaItems.map((item, idx) => <MediaItem onItemSelect={onItemSelect} key={idx} item={item} />)}
      </ul>
    </>
  )
}

export default MediaLibrary