import cache, { currentContentItemVar } from "../../../../graphql/cache"
import { ContentFragment } from "../../../../graphql/queries/allQueries"
import MediaLibrary from "../../../MediaLibrary/MediaLibrary"
import { ModalContext } from "../../../../context/modalContext";
import { useContext } from "react";

const ImageLibraryModal = ({onImageSelect=null}) => {
  
  const { closeModal } = useContext(ModalContext)

  const handleImageSelect = (item) => {
    // insertBlockAtIndex(newBlock, blocks.length)
    onImageSelect?.(item)
    closeModal()
  }
  
  return (
    <>
      <MediaLibrary onItemSelect={handleImageSelect} typeFilter={['image']} />
    </>
  )
}

export default ImageLibraryModal
