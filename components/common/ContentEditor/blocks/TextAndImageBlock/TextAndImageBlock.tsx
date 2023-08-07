
import React, { useMemo, FunctionComponent } from 'react';
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
        style={{width}}
        src={block.properties?.url ?? '/images/image-block-placeholder.jpg'}
      />
    </>
  );
}

export default TextAndImageBlock