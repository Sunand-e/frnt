import { FunctionComponent, useCallback } from 'react';

import Editor from '../../../inputs/Editor';
import useBlockEditor from '../../useBlockEditor';
import { useBlockStore } from '../../useBlockStore';

interface LinkBlockEditProps {
  id: string;
}

export const LinkBlockEdit: FunctionComponent<LinkBlockEditProps> = ({ id }) => {
  const block = useBlockStore(state => state.computed.getBlock(id))

  const { properties } = block
  
  const { debouncedUpdateBlock } = useBlockEditor()

  const blockRef = useBlockStore(state => state.blockRefs.get(id))
  const zIndex = useBlockStore(state => state.zIndexes.get(id))

  const handleChange = useCallback((newValue: any) => {
    const updatedBlock = {
      ...block,
      properties: {
        ...block.properties,
        content: newValue
      }
    }
    debouncedUpdateBlock(updatedBlock)
  },[block, debouncedUpdateBlock])
  
  const onMenuShow = useCallback(() => {
    if(blockRef) {
      blockRef.style.zIndex = '99999'
    }
  },[blockRef])

  const onMenuHidden = useCallback(() => {
    if(blockRef) {
      blockRef.style.zIndex = zIndex
    }
  },[blockRef])

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

export default LinkBlockEdit