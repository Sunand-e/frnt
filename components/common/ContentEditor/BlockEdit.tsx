import classNames from '../../../utils/classNames';
import blocktypes from './blocktypes';
import { useBlockStore } from './useBlockStore';

export const BlockEdit = ({ id, dragOverlay = false }) => {

  const block = useBlockStore(state => state.computed.getBlock(id))
  
  const blockType = blocktypes[block.type]
  const BlockEditComponent = blockType?.editComponent
  // create seperate ID for drag overlays
  const blockId = dragOverlay ? `${dragOverlay}-${id}` : id;
  const displayType = block.displayType || 'normal'
  
  return (
    <div className={classNames(
      // isActive && 'rounded-md border-dashed border-main/60 border-2 border-main',
      'h-full w-full',
      displayType !== 'fullwidth' && 'max-w-screen-lg'
    )}>
      { BlockEditComponent && <BlockEditComponent id={blockId} block={block} /> }
    </div>
  );
};
