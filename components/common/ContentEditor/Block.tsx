import blocktypes from './blocktypes';
import { getIndexAndParent } from './useBlockStore';

export const Block = ({ block, dragOverlay = false }) => {

  const { id, type } = block
  const BlockComponent = blocktypes[type]?.component
  // create seperate ID for drag overlays
  const blockId = dragOverlay ? `overlay-${id}` : id;

  let bgImageCssString = ''
  if(block.style?.bgImageEnabled || block.type === 'textOnImage') {
    // if(block?.style?.overlayColor) {
      
    const overlayColor = block?.style?.overlayColor || 'rgba(0,0,0,0.5)'
      bgImageCssString = `
        linear-gradient(
          ${overlayColor}, 
          ${overlayColor}
        ),
      `
    // }
    bgImageCssString += `url(${block?.style?.bgImage?.location || '/images/image-block-placeholder.jpg'})`
  }
  console.log({...((block.style?.bgImageEnabled || block.type === 'textOnImage') && { 
    backgroundImage: bgImageCssString
  })})
  return (
    // <div className="p-2 mb-4 bg-white rounded-lg shadow shadow-lg">
    <div className={`flex flex-col items-center`}
    style={{
      backgroundColor: block.style?.bgColor,
      ...((block.style?.bgImageEnabled || block.type === 'textOnImage') && { 
        backgroundImage: bgImageCssString
      }),
      backgroundPosition: block?.style?.backgroundPosition || 'center',
      backgroundSize: 'cover',
      color: block?.style?.textColor || 'inherit',
      // backgroundColor: block?.properties?.bgColor,
      paddingTop: block?.properties?.paddingTop,
      paddingBottom: block?.properties?.paddingBottom,
      paddingLeft: block?.properties?.paddingLeft,
      paddingRight: block?.properties?.paddingRight,
      // color: block?.properties?.textColor || 'inherit'
    }}>
      <div className='w-full max-w-screen-lg'>
        { BlockComponent && <BlockComponent id={blockId} block={block} /> }
      </div>
    </div>
  );
};
