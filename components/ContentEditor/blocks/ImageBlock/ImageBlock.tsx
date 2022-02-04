import {
  FunctionComponent
} from 'react';

export const ImageBlock: FunctionComponent = ({block}) => {

  const  defaultWidth = '50%';

  return (
    <img
      className={`block max-w-full px-1 w-full borderRadius[3px] object-cover boxShadow[0 0 0 1px rgb(59,130,249)]`}
      src={block.properties.url ?? '/images/image-block-placeholder.jpg'}
    />
  );
}

export default ImageBlock