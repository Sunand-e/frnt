
import React, { useMemo, FunctionComponent } from 'react';
import Editor from '../../../inputs/Editor';

export const HeadingBlock: FunctionComponent = ({block}) => {
  const { properties } = block

  return (
    <>
      <Editor isHeading={true} editable={false} content={properties?.content} editorClass={'my-2'} />
    </>
  );
}

export default HeadingBlock