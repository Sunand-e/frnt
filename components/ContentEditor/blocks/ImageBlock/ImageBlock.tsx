import {
  FunctionComponent
} from 'react';

export const ImageBlock: FunctionComponent = ({block}) => {

  const width = block?.properties?.width || '50%';

  return (
    <>
    <img
      style={{width}}
      className={`mx-auto block max-w-full px-1 w-full borderRadius[3px] object-cover boxShadow[0 0 0 1px rgb(59,130,249)]`}
      src={block.properties.url ?? '/images/image-block-placeholder.jpg'}
    />
    </>
  );
}

export default ImageBlock