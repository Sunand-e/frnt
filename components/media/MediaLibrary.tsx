import { useQuery } from "@apollo/client"
import { GetMediaItems } from "../../graphql/queries/__generated__/GetMediaItems";
import MediaUploader from "./MediaUploader"
import MediaLibraryItem from "./MediaLibraryItem"
import { GET_MEDIA_ITEMS } from "../../graphql/queries/mediaItems";

interface MediaLibraryProps {
  onItemSelect?: any
  onUploadComplete?: any
  typeFilter?: string[]
}

const MediaLibrary: React.FunctionComponent<MediaLibraryProps> = ({onItemSelect, onUploadComplete, typeFilter = ["image", "document", "video", "audio"]}) => {

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
    <div className="flex flex-col space-y-4">
    <MediaUploader { ...{ onUploadComplete } } />
      <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
      {/* <ul role="list" className=""> */}
        { mediaItems.map((item, idx) => (
          <li key={item.id} className="relative">
            <MediaLibraryItem onItemSelect={onItemSelect} item={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MediaLibrary