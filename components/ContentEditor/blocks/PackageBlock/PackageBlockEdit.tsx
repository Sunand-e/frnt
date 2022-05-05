import {
  FunctionComponent, useContext
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import dynamic from 'next/dynamic';
import Button from '../../../Button';
import { ModalContext } from '../../../../context/modalContext';
import useBlockEditor from '../../useBlockEditor';
import PackageLibrary from '../../../PackageLibrary/PackageLibrary';
import { v4 as uuidv4 } from 'uuid';

const DynamicPackageIFrame = dynamic(
  () => import('./PackageIFrame'),
  { ssr: false }
)

export const PackageBlockEdit: FunctionComponent = ({block}) => {

  const { handleModal, closeModal } = useContext(ModalContext)
  
  const  defaultWidth = '100%';
 
  
  const { updateBlock, addBlock } = useBlockEditor(block)

   
  const handlePackageSelect = (module) => {
    updateBlock({
      ...block,
      properties: {
        ...block.properties,
        url: module.launchUrl,
      }
    })
    closeModal()
  }

  const selectFile = (module) => {

    alert(JSON.stringify(block))
    const newBlock = {
      type: 'package',
      id: uuidv4(),
      properties: {
        // this needs to change to insert the url package location!
        // url: '/scorm/golf-examples-multi-sco-scorm-1.2/shared/launchpage.html',
        // url: `${prefix}/scorms/${module.id}//${module.launchUrl}`,
        url: module.launchUrl,
      }
    }
    addBlock(newBlock)
    // block ? updateBlock(block, newBlock) : insertBlock(newBlock, blocks.length)
    closeModal()
  }


  const selectPackageModal = () => {
    handleModal({
      title: `Choose package`,
      content: <PackageLibrary onItemSelect={handlePackageSelect} />,
      size: 'lg'
    })
  }
  return (
    <>
    {/* <pre>
    { JSON.stringify(block, null, 2)}
    </pre> */}
      
    <ResizeableElement
      block={block}
      defaultWidth={defaultWidth}
    >
      { block.properties?.url ? (
        <div className="aspect-w-16 aspect-h-9 px-1">
          <DynamicPackageIFrame block={block}/>
        </div>
      ) : (
        <div className='text-center'>
          <Button onClick={selectPackageModal}>Select a SCORM zip file</Button>
        </div>
      )}
    </ResizeableElement>
    </>
  );
}

export default PackageBlockEdit