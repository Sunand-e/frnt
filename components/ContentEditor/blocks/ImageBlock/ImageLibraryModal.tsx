import cache, { currentContentItemVar } from "../../../../graphql/cache"
import { ContentFragment } from "../../../../graphql/queries/allQueries"
import MediaLibrary from "../../../MediaLibrary/MediaLibrary"
import { v4 as uuidv4 } from 'uuid';
import { ModalContext } from "../../../../context/modalContext";
import { useContext } from "react";

const ImageLibraryModal = () => {
  
  // *** The below code needs to be refactored, it is used in various components: ***
  const { id, type, updateFunction } = currentContentItemVar()

  const { closeModal } = useContext(ModalContext);

  const contentData = cache.readFragment({
    id:`ContentItem:${id}`,
    fragment: ContentFragment,
    // fragmentName: 'SectionFragment'
  })
  
  const blocks = contentData.content?.blocks || []
  // *** END of code to be refactored ***
  
  // *** The below code needs to be refactored, it is used in various components: ***
  const insertBlockAtIndex = (newBlock, targetIndex) => {
    console.log('insertBlockAtIndex', newBlock, targetIndex)
    const newBlocks = [
      ...blocks.slice(0, targetIndex),
      newBlock,
      ...blocks.slice(targetIndex)
    ]
    updateFunction(newBlocks);
  }
  // *** END of code to be refactored ***


  const handleImageSelect = (item) => {
    const newBlock = {
      type: 'image',
      id: uuidv4(),
      properties: {
        url: item.location,
        mediaId: item.id
      }
    }
    insertBlockAtIndex(newBlock, blocks.length)
    closeModal()
  }
  
  return (
    <>
      <MediaLibrary onItemSelect={handleImageSelect} typeFilter={['image']} />
    </>
  )
}

export default ImageLibraryModal
