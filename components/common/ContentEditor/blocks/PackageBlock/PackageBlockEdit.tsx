import { MutableRefObject, useRef } from 'react';
import ResizeableElement from '../common/ResizeableElement';
import dynamic from 'next/dynamic';
import Button from '../../../Button';
import useBlockEditor from '../../useBlockEditor';
import PackageLibrary from '../../../../packages/PackageLibrary';
import useFullscreen from '@rooks/use-fullscreen';
import { closeModal, handleModal } from '../../../../../stores/modalStore';

const DynamicPackageIFrame = dynamic(
  () => import('./PackageIFrame'),
  { ssr: false }
)

export const PackageBlockEdit = ({
  block
}) => {
  const  defaultWidth = '100%'
  const iframeRef : MutableRefObject<HTMLIFrameElement> = useRef();
  
  const {
    isEnabled: isFullscreenEnabled,
    request,
  } = useFullscreen()
  
  const { updateBlock, addBlock } = useBlockEditor(block)
  
   
  const handlePackageSelect = (scormPackage) => {
    updateBlock({
      ...block,
      properties: {
        ...block.properties,
        url: scormPackage.launchUrl,
        moduleId: scormPackage.id,
        title: scormPackage.title
      }
    })
    closeModal()
  }

  const selectPackageModal = () => {
    handleModal({
      title: `Choose package`,
      content: (
        <PackageLibrary 
          onItemSelect={handlePackageSelect}
        />
      ),
      size: 'lg'
    })
  }
  
  return (
    <>
      {/* { isFullscreenEnabled && (
        <div className='flex justify-end my-4'>
          <Button onClick={() => request(iframeRef.current)} className=''>Go fullscreen</Button>
        </div>
      )} */}
      <ResizeableElement
        block={block}
        defaultWidth={defaultWidth}
        >
        { block.properties?.url ? (
          <div className="aspect-video px-1">
            <DynamicPackageIFrame block={block} isEditing={true} iframeRef={iframeRef} />
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