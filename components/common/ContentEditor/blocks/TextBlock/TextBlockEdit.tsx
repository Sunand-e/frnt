import React, { useMemo, FunctionComponent, useEffect } from 'react';

import useBlockEditor from '../../useBlockEditor';
import Editor from './Editor';

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

  const focus = () => {
    // const editor = getPlateEditorRef(block.id)
    // if(editor) {
    //   Transforms.select(editor, Editor.end(editor, []));
    //   ReactEditor.focus(editor);  
    // }
  }

  return (
    <>
      <Editor onUpdate={handleChange} content={properties?.content} />
    </>
  );
}

export default TextBlockEdit