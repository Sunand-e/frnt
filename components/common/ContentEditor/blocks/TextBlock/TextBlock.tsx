
import React, { useMemo, FunctionComponent } from 'react';
import Editor from './Editor';

export const TextBlock: FunctionComponent = ({block}) => {
  const { properties } = block

  return (
    <>
      <Editor editable={false} content={properties?.content} />
    </>
  );
}

export default TextBlock