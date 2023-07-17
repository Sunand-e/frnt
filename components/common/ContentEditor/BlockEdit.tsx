import blocktypes from './blocktypes';
import { getBlock } from './useBlockStore';

export const BlockEdit = ({ id, containerRef=null, dragOverlay = false }) => {

  const block = getBlock(id)
  const { type } = block
  const BlockEditComponent = blocktypes[type]?.editComponent
  // create seperate ID for drag overlays
  const blockId = dragOverlay ? `${dragOverlay}-${id}` : id;
  return (
    <div className={`h-full w-full max-w-screen-lg`}>
      { BlockEditComponent && <BlockEditComponent containerRef={containerRef} id={blockId} block={block} /> }
    </div>
  );
};
