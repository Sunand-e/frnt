import cache, { currentContentItemVar } from "../../../../graphql/cache"
import { ContentFragment } from "../../../../graphql/queries/allQueries"
import MediaLibrary from "../../../MediaLibrary/MediaLibrary"
import { v4 as uuidv4 } from 'uuid';
import { ModalContext } from "../../../../context/modalContext";
import { useContext } from "react";

const ImageLibraryModal = ({onImageSelect=null}) => {
  
  const { closeModal } = useContext(ModalContext)

  const handleImageSelect = (item) => {
    const newBlock = {
      type: 'image',
      id: uuidv4(),
      properties: {
        url: item.location,
        mediaId: item.id
      }
    }
    // insertBlockAtIndex(newBlock, blocks.length)
    onImageSelect?.(newBlock)
    closeModal()
  }
  
  return (
    <>
      <MediaLibrary onItemSelect={handleImageSelect} typeFilter={['image']} />
    </>
  )
}

export default ImageLibraryModal
