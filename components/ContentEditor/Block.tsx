import blocktypes from './blocktypes';

export const Block = ({ block, dragOverlay = false }) => {

  const { id, type } = block
  const BlockComponent = blocktypes[type]?.component

  // create seperate ID for drag overlays
  const blockId = dragOverlay ? `${dragOverlay}-${id}` : id;
  return (
    // <div className="p-2 mb-4 bg-white rounded-lg shadow shadow-lg">
    <div className={`py-4 w-full max-w-screen-lg mb-12`}>
      { BlockComponent && <BlockComponent id={blockId} block={block} /> }
    </div>
  );
};
