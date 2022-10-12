import blocktypes from './blocktypes';
import { getIndexAndParent } from './useBlockStore';

export const Block = ({ block, dragOverlay = false }) => {

  const { id, type } = block
  const BlockComponent = blocktypes[type]?.component

  const { parent } = getIndexAndParent(block.id)
  // create seperate ID for drag overlays
  const blockId = dragOverlay ? `overlay-${id}` : id;
  return (
    // <div className="p-2 mb-4 bg-white rounded-lg shadow shadow-lg">
    <div className={`${parent ? '' : '-mx-16'} flex flex-col items-center`}
    style={{
      backgroundColor: block?.properties?.bgColor,
      paddingTop: block?.properties?.paddingTop || "20px",
      paddingBottom: block?.properties?.paddingBottom || "20px",
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
