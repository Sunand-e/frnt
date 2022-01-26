import cache, { currentContentItemVar } from "../../../../graphql/cache"
import { ContentFragment } from "../../../../graphql/queries/allQueries"
import MediaLibrary from "../../../MediaLibrary/MediaLibrary"
import { v4 as uuidv4 } from 'uuid';
import { ModalContext } from "../../../../context/modalContext";
import { useContext } from "react";
import useBlockEditor from "../../useBlockEditor";

const PackageSelectModal = ({block}) => {

  const { closeModal } = useContext(ModalContext);

  const { blocks, insertBlock, updateBlock } = useBlockEditor()

  const handlePackageSelect = (item) => {
    const newBlock = {
      type: 'package',
      id: uuidv4(),
      properties: {
        url: '/scorm/golf-examples-multi-sco-scorm-1.2/shared/launchpage.html',
        // url: item.location,
      }
    }
    block ? updateBlock(block, newBlock) : insertBlock(newBlock, blocks.length)
    closeModal()
  }
  
  return (
    <>
      <MediaLibrary onItemSelect={handlePackageSelect} typeFilter={['image']} />
    </>
  )
}

export default PackageSelectModal
