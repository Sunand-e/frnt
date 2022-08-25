import { useQuery, useReactiveVar } from "@apollo/client"
import { Fragment, useEffect } from "react";
import { mediaItemsVar } from "../../graphql/cache"
import { GET_MEDIA_ITEMS } from "../../graphql/queries/allQueries";
import { GetMediaItems } from "../../graphql/queries/__generated__/GetMediaItems";
import useModal from "../../hooks/useModal";
import Modal from "../Modal";
import MediaUploader from "./MediaUploader"
import MediaItem from "./MediaItem"

interface MediaLibraryProps {
  onItemSelect?: any
  typeFilter?: string[]
}

const MediaLibrary: React.FunctionComponent<MediaLibraryProps> = ({onItemSelect, typeFilter = ["image", "document", "video", "audio"]}) => {

  
  const { handleModal } = useModal()

  const { loading, error, data: { mediaItems } = {} } = useQuery<GetMediaItems>(GET_MEDIA_ITEMS, {
    variables: { 
      where: {
        media_type: typeFilter
      }
    }
  })

  const handleItemDelete = () => {
    // handleModal({title: 'Delete media item', content: 'Delete media item?'})
  }

  if (loading) return <>Loading...</>
  if (error) return <>`Error! ${error}`</>

  return (
    <>
    <MediaUploader />
      <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
      {/* <ul role="list" className=""> */}
        { mediaItems.map((item, idx) => (
          <MediaItem key={item.id} onItemSelect={onItemSelect} item={item} />
        ))}
      </ul>
    </>
  )
}

export default MediaLibrary