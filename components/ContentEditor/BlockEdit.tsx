import blocktypes from './blocktypes';

export const BlockEdit = ({ block, dragOverlay = false }) => {

  const { id, type } = block
  const BlockEditComponent = blocktypes[type]?.editComponent

  // create seperate ID for drag overlays
  const blockId = dragOverlay ? `${dragOverlay}-${id}` : id;
  return (
    // <div className="p-2 mb-4 bg-white rounded-lg shadow shadow-lg">
    <div className={`h-full py-1 w-full max-w-screen-lg`}>
      { BlockEditComponent && <BlockEditComponent id={blockId} block={block} /> }
    </div>
  );
};
