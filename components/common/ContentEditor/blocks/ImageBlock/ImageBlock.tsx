import {
  FunctionComponent
} from 'react';
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
    </>
  );
}

export default ImageBlock