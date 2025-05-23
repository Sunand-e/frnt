import dynamic from 'next/dynamic';
import { MutableRefObject, useRef, useState } from 'react';
import useWarningOnExit from '../../../hooks/useWarningOnExit';
import { useBlockStore } from '../../common/ContentEditor/useBlockStore';

const DynamicPackageIFrame = dynamic(
  () => import('../../common/ContentEditor/blocks/PackageBlock/PackageIFrame'),
  { ssr: false }
)

const ScormView = ({isEditing = false}) => {

  const blocks = useBlockStore(state => state.blocks)

  const iframeRef : MutableRefObject<HTMLIFrameElement> = useRef();

  const block = blocks.find(b => b.type === 'package')
  
  const [attempt, setAttempt] = useState(null)

  return (
    <div className="h-full w-full">
      {block && (
        <DynamicPackageIFrame
         block={block}
         isEditing={isEditing}
         iframeRef={iframeRef}
         key={block.id}
         attempt={attempt}
         setAttempt={setAttempt}
         />
      )}
    </div>
  );
};

export default ScormView
