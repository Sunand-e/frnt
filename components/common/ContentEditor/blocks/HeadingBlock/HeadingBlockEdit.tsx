import React, { useMemo, FunctionComponent, useEffect, useCallback } from 'react';

import useBlockEditor from '../../useBlockEditor';
import Editor from '../../../inputs/Editor';
import { useBlockStore } from '../../useBlockStore';

export const HeadingBlockEdit: FunctionComponent = ({id}) => {
  // const block = useBlockStore(state => state.getBlock(id))
  const block = useBlockStore(state => state.computed.getBlock(id))

  const { properties } = block
  
  const { debouncedUpdateBlock } = useBlockEditor()

  const blockRef = useBlockStore(state => state.blockRefs.get(id))
  const zIndex = useBlockStore(state => state.zIndexes.get(id))

  const handleChange = useCallback(newValue => {
    const updatedBlock = {
      ...block,
      properties: {
        ...block.properties,
        content: newValue
      }
    }
    debouncedUpdateBlock(updatedBlock)
  },[block, debouncedUpdateBlock])
   
  const onMenuShow = useCallback((instance) => {
    if(blockRef) {
      blockRef.style.zIndex = '99999'
    }
  },[blockRef])

  const onMenuHidden = useCallback((instance) => {
    if(blockRef) {
      blockRef.style.zIndex = zIndex
    }
  },[blockRef])

  return (
    <h3>
      <Editor
        onUpdate={handleChange}
        isHeading={true}
        onMenuShow={onMenuShow}
        onMenuHidden={onMenuHidden}
        content={properties?.content}
        editorClass={'my-2'}
        placeholder={"Enter heading here..."}
      />
    </h3>
  );
}

export default HeadingBlockEdit