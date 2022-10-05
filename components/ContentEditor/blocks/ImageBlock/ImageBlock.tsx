import {
  FunctionComponent
} from 'react';
import Image from '../../../common/image/Image';

export const ImageBlock = ({block}) => {

  const width = block?.properties?.width || '50%';

  return (
    <>
    <Image
      style={{width}}
      src={block.properties?.url ?? '/images/image-block-placeholder.jpg'}
    />
    </>
  );
}

export default ImageBlock