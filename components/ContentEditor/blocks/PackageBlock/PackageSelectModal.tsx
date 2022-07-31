import { v4 as uuidv4 } from 'uuid';
import { ModalContext } from "../../../../context/modalContext";
import { useContext } from "react";
import useBlockEditor from "../../useBlockEditor";
import PackageLibrary from "../../../PackageLibrary/PackageLibrary";

const PackageSelectModal = ({block}) => {

  const { closeModal } = useContext(ModalContext);

  const { blocks, addBlock } = useBlockEditor(block)

  const handlePackageSelect = (module) => {

    const newBlock = {
      type: 'package',
      id: uuidv4(),
      properties: {
        // this needs to change to insert the url package location!
        // url: '/scorm/golf-examples-multi-sco-scorm-1.2/shared/launchpage.html',
        // url: `${prefix}/scorms/${module.id}//${module.launchUrl}`,
        url: module.launchUrl,
        moduleId: module.id,
      }
    }
    addBlock(newBlock)
    // block ? updateBlock(block, newBlock) : insertBlock(newBlock, blocks.length)
    closeModal()
  }
  
  return (
    <>
      <PackageLibrary onItemSelect={handlePackageSelect} />
    </>
  )
}

export default PackageSelectModal
