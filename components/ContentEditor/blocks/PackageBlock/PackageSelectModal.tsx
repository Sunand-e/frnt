import { v4 as uuidv4 } from 'uuid';
import { ModalContext } from "../../../../context/modalContext";
import { useContext } from "react";
import useBlockEditor from "../../useBlockEditor";
import PackageLibrary from "../../../PackageLibrary/PackageLibrary";

const PackageSelectModal = ({block}) => {

  const { closeModal } = useContext(ModalContext);

  const { blocks, insertBlock, updateBlock } = useBlockEditor()

  const handlePackageSelect = (module) => {
    const prefix = 'https://learning-platform-media-items.s3.eu-west-2.amazonaws.com'
    const newBlock = {
      type: 'package',
      id: uuidv4(),
      properties: {
        // this needs to change to insert the url package location!
        // url: '/scorm/golf-examples-multi-sco-scorm-1.2/shared/launchpage.html',
        url: `${prefix}/scorms/${module.id}//${module.launchUrl}`,
      }
    }
    block ? updateBlock(block, newBlock) : insertBlock(newBlock, blocks.length)
    closeModal()
  }
  
  return (
    <>
      <PackageLibrary onItemSelect={handlePackageSelect} />
    </>
  )
}

export default PackageSelectModal
