import {
  FunctionComponent, useRef
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import dynamic from 'next/dynamic';
import { useFullscreen } from 'rooks';
import Button from '../../../Button';

const DynamicPackageIFrame = dynamic(
  () => import('./PackageIFrame'),
  { ssr: false }
)

export const PackageBlock: FunctionComponent = ({block}) => {

  const iframeRef = useRef();
  
  const {
    isEnabled: isFullscreenEnabled,
    request,
  } = useFullscreen()

  return (
    <>
    { isFullscreenEnabled && (
      <div className='flex justify-end my-4'>
        <Button onClick={() => request(iframeRef.current)} className=''>Go fullscreen</Button>
      </div>
    )}
    <div className="aspect-w-16 aspect-h-9 px-1">
      <DynamicPackageIFrame block={block} iframeRef={iframeRef} />
    </div>
  </>
  );
}

export default PackageBlock