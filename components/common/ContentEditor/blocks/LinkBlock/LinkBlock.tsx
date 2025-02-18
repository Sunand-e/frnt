
import React, { useMemo, FunctionComponent } from 'react';
import Editor from '../../../inputs/Editor';

interface LinkBlockProps {
  block: {
    properties: {
      content: string;
    };
  };
}

export const LinkBlock: FunctionComponent<LinkBlockProps> = ({ block }) => {
  const { properties } = block

  return (
    <>
      <Editor editable={false} content={properties?.content} editorClass={'my-2'} />
    </>
  );
}

export default LinkBlock