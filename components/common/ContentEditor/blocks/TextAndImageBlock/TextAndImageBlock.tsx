
import React, { useMemo, FunctionComponent } from 'react';
import classNames from '../../../../../utils/classNames';
import Image from '../../../image/Image';
import Editor from '../../../inputs/Editor';

export const TextAndImageBlock: FunctionComponent = ({block}) => {
  const width = block?.properties?.width || '50%';

  return (
    <>
    <pre>
    {/* { JSON.stringify(block.content,null,2) } */}
    </pre>
      <Editor editable={false} content={block.content} />
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

export default TextAndImageBlock