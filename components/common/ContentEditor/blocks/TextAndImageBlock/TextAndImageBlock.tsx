
import React, { useMemo, FunctionComponent } from 'react';
import Editor from '../../../inputs/Editor';

export const TextAndImageBlock: FunctionComponent = ({block}) => {
  const { properties } = block

  return (
    <>
      <Editor editable={false} content={properties?.content} />
    </>
  );
}

export default TextAndImageBlock