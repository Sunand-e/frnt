
import React, { useMemo, FunctionComponent } from 'react';
import Editor from '../../../inputs/Editor';

export const HeadingBlock: FunctionComponent = ({block}) => {
  const { properties } = block

  return (
    <h3>
      <Editor isHeading={true} editable={false} content={properties?.content} editorClass={'my-2'} />
    </h3>
  );
}

export default HeadingBlock