import cache, { currentContentItemVar } from "../../../../graphql/cache"
import { ContentFragment } from "../../../../graphql/queries/allQueries"
import MediaLibrary from "../../../MediaLibrary/MediaLibrary"
import { ModalContext } from "../../../../context/modalContext";
import { useContext } from "react";

const ImageLibraryModal = ({onSelect=null}) => {
  
  const { closeModal } = useContext(ModalContext)

  const handleSelect = (item) => {
    // insertBlockAtIndex(newBlock, blocks.length)
    onSelect?.(item)
    closeModal()
  }
  
  return (
    <>
      <MediaLibrary onItemSelect={handleSelect} typeFilter={['document']} />
    </>
  )
}

export default ImageLibraryModal
