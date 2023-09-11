
import React, { useMemo, FunctionComponent } from 'react';
import Image from '../../../image/Image';
import Editor from '../../../inputs/Editor';

export const TextOnImageBlock: FunctionComponent = ({block}) => {
  const width = block?.properties?.width || '50%';

  return (
    <div className='min-h-[240px] flex items-center'>
      <Editor isHeading={true} editorClass={'text-white'} editable={false} content={block.content} />
    </div>
  );
}

export default TextOnImageBlock