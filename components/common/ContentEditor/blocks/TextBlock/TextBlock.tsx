
import React, { useMemo, FunctionComponent } from 'react';
import Editor from '../../../inputs/Editor';

export const TextBlock: FunctionComponent = ({block}) => {
  const { properties } = block

  return (
    <>
      <Editor editable={false} content={properties?.content} editorClass={'my-2'} />
    </>
  );
}

export default TextBlock