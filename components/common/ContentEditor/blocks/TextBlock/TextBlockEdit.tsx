import React, { useMemo, FunctionComponent, useEffect, useCallback } from 'react';

import useBlockEditor from '../../useBlockEditor';
import Editor from '../../../inputs/Editor';
import { useBlockStore } from '../../useBlockStore';

export const TextBlockEdit: FunctionComponent = ({id}) => {
  // const block = useBlockStore(state => state.getBlock(id))
  const block = useBlockStore(state => state.computed.getBlock(id))

  const { properties } = block
  
  const { debouncedUpdateBlock } = useBlockEditor()

  const blockRef = useBlockStore(state => state.blockRefs.get(id))
  const zIndex = useBlockStore(state => state.zIndexes.get(id))

  const handleChange = (newValue) => {
    const updatedBlock = {
      ...block,
      properties: {
        ...block.properties,
        content: newValue
      }
    }
    debouncedUpdateBlock(updatedBlock)
  }

  useEffect(() => {
    !properties?.content && setTimeout(focus, 10);
  },[])
   
  const onMenuShow = (instance) => {
    if(blockRef) {
      blockRef.style.zIndex = '99999'
    }
  }

  const onMenuHidden = (instance) => {
    if(blockRef) {
      blockRef.style.zIndex = zIndex
    }
  }

  return (
    <>
      <Editor
        onUpdate={handleChange}
        onMenuShow={onMenuShow}
        onMenuHidden={onMenuHidden}
        content={properties?.content}
        editorClass={'my-2'}
      />
    </>
  );
}

export default TextBlockEdit