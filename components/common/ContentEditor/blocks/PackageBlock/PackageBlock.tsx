import {
  FunctionComponent, MutableRefObject, useRef, useState
} from 'react';
import ResizeableElement from '../common/ResizeableElement';
import dynamic from 'next/dynamic';
import useFullscreen from '@rooks/use-fullscreen';
import Button from '../../../Button';

const DynamicPackageIFrame = dynamic(
  () => import('./PackageIFrame'),
  { ssr: false }
)

export const PackageBlock = ({block}) => {

  const iframeRef: MutableRefObject<HTMLIFrameElement> = useRef();
  
  // const {
  //   isFullscreenEnabled,
  //   isFullscreenAvailable,
  //   toggleFullscreen
  // } = useFullscreen({target: iframeRef})

  const [attempt, setAttempt] = useState(null)

  return (
    <>
      {/* <div className='flex justify-end space-x-2 my-4'>
        { isFullscreenAvailable && (
          <Button onClick={toggleFullscreen} className=''>Go fullscreen</Button>
        )}
      </div> */}
        {/* <Button onClick={() => setAttempt(attempt => attempt + 1)} className=''>Start new attempt</Button> */}
      <div className="aspect-video px-1">
        <DynamicPackageIFrame
          key={block.id}
          block={block}
          attempt={attempt}
          setAttempt={setAttempt}
          iframeRef={iframeRef}
        />
      </div>
    </>
  );
}

export default PackageBlock