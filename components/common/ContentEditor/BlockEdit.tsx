import blocktypes from './blocktypes';
import { useBlockStore } from './useBlockStore';

export const BlockEdit = ({ id, dragOverlay = false }) => {

  // const block = getBlock(id)
  const block = useBlockStore(state => state.computed.getBlock(id))
  
  const { type } = block
  const BlockEditComponent = blocktypes[type]?.editComponent
  // create seperate ID for drag overlays
  const blockId = dragOverlay ? `${dragOverlay}-${id}` : id;
  return (
    <div className={`h-full w-full max-w-screen-lg`}>
      { BlockEditComponent && <BlockEditComponent id={blockId} block={block} /> }
    </div>
  );
};
