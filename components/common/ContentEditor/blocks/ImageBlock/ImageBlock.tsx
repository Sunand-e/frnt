import classNames from '../../../../../utils/classNames';
import Image from '../../../image/Image';

export const ImageBlock = ({block}) => {

  const width = block.style?.width || '50%';
  (block.imageSize === 'default' || block.imageSize === undefined) ? 'max-w-[50%]' : 'w-full'
  return (
    <>
    <Image
      style={{...(block.imageSize === 'custom' && {width})}}
      className={classNames(
        block.imageSize === 'fullwidth' && 'max-h-[30rem] h-[30rem]',
        (block.imageSize === 'default' || block.imageSize === undefined) ? 'max-w-[50%]' : 'w-full'
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