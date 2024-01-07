import classNames from '../../../utils/classNames';
import blocktypes from './blocktypes';

export const Block = ({ block, dragOverlay = false }) => {

  const { id, type } = block
  const BlockComponent = blocktypes[type]?.component
  // create seperate ID for drag overlays
  const blockId = dragOverlay ? `overlay-${id}` : id;

  const displayType = block.displayType || 'normal'
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

  return (
    // <div className="p-2 mb-4 bg-white rounded-lg shadow shadow-lg">
    <div className={`flex flex-col items-center`}
    style={{
      backgroundColor: block.style?.bgColor,
      ...((block.style?.bgImageEnabled || block.type === 'textOnImage') && { 
        backgroundImage: bgImageCssString
      }),
      backgroundPosition: block?.style?.backgroundPosition || 'center',
      backgroundSize: block?.style?.backgroundSize || 'cover',
      color: block?.style?.textColor || 'inherit',
      // backgroundColor: block?.style?.bgColor,
      paddingTop: block?.style?.paddingTop,
      paddingBottom: block?.style?.paddingBottom,
      paddingLeft: block?.style?.paddingLeft,
      paddingRight: block?.style?.paddingRight,
      // color: block?.style?.textColor || 'inherit'
    }}>
      <div className={classNames(
        'w-full',
        displayType !== 'fullwidth' && 'max-w-screen-lg'
      )}>
        { BlockComponent && <BlockComponent id={blockId} block={block} /> }
      </div>
    </div>
  );
};
