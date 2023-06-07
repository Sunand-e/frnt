import React, { useMemo, FunctionComponent, useEffect } from 'react';

import useBlockEditor from '../../useBlockEditor';
import Editor from '../../../inputs/Editor';

export const TextBlockEdit: FunctionComponent = ({block}) => {
  const { properties } = block

  const { debouncedUpdateBlock } = useBlockEditor()

  const handleChange = (newValue) => {
    document.querySelector('#debug_panel').innerHTML = '<pre>'+JSON.stringify(newValue,null,2)+'</pre>'
    const updatedBlock = {
      ...block,
      properties: {
        ...block.properties,
        content: newValue
      }
    }
    debouncedUpdateBlock(updatedBlock)// return false
  }

  useEffect(() => {
    !properties?.content && setTimeout(focus, 10);
  },[])

  return (
    <>
      <Editor onUpdate={handleChange} content={properties?.content} editorClass={'m-5'} />
    </>
  );
}

export default TextBlockEdit