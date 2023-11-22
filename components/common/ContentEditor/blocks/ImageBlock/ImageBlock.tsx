import classNames from '../../../../../utils/classNames';
import { getIndexAndParent, useBlockStore } from '../../useBlockStore';

export const ImageBlock = ({block}) => {

  const { parent } = getIndexAndParent(block.id)

  const width = block.style?.width || '50%';

  let imageClasses = ''
  if(parent?.type === 'columns') {
    imageClasses += 'w-full'
  } else {
    if(block.imageSize === 'fullwidth') {
      imageClasses += 'max-h-[30rem] h-[30rem]'
    }
    if(block.imageSize === 'default' || block.imageSize === undefined) {
      imageClasses += 'max-w-[50%]'
    } else {
      imageClasses += 'w-full'
    }
  }
  
  return (
    <>
    <img
      style={{...(block.imageSize === 'custom' && {width})}}
      className={classNames(
        imageClasses
      )}
      src={block.properties?.url ?? '/images/image-block-placeholder.jpg'}
    />
    { block.properties?.showCaption && block.properties?.captionText && (
      <p className={'text-sm block text-center p-3 text-gray-500'}>
        { block.properties.captionText }
      </p>
    )}
    </>
  );
}

export default ImageBlock