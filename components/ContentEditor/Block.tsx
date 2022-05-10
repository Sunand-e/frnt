import blocktypes from './blocktypes';

export const Block = ({ block, dragOverlay = false }) => {

  const { id, type } = block
  const BlockComponent = blocktypes[type]?.component

  // create seperate ID for drag overlays
  const blockId = dragOverlay ? `${dragOverlay}-${id}` : id;
  return (
    // <div className="p-2 mb-4 bg-white rounded-lg shadow shadow-lg">
    <div className={`py-1 -mx-16 flex flex-col items-center`}
    style={{
      backgroundColor: block?.properties?.bgColor,
      paddingTop: block?.properties?.paddingTop,
      paddingBottom: block?.properties?.paddingBottom,
      paddingLeft: block?.properties?.paddingLeft,
      paddingRight: block?.properties?.paddingRight,
      color: block?.properties?.textColor || 'inherit'
    }}>
      <div className='w-full max-w-screen-lg mb-12'>
        { BlockComponent && <BlockComponent id={blockId} block={block} /> }
      </div>
    </div>
  );
};
