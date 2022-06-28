import blocktypes from './blocktypes';
import useBlockEditor from './useBlockEditor';

export const BlockEdit = ({ id, dragOverlay = false }) => {

  const { getBlock } = useBlockEditor()

  const block = getBlock(id)

  const { type } = block
  const BlockEditComponent = blocktypes[type]?.editComponent
console.log('bloooooock')
  // create seperate ID for drag overlays
  const blockId = dragOverlay ? `${dragOverlay}-${id}` : id;
  return (
    <div className={`h-full w-full max-w-screen-lg`}>
      { BlockEditComponent && <BlockEditComponent id={blockId} block={block} /> }
    </div>
  );
};
