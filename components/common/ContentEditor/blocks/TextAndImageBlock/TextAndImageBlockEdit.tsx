import React, { useMemo, FunctionComponent, useEffect, useCallback } from 'react';

import useBlockEditor from '../../useBlockEditor';
import Editor from '../../../inputs/Editor';
import { useBlockStore } from '../../useBlockStore';
import ResizeableElement from '../common/ResizeableElement';
import ImageSelectFromLibrary from '../../ImageSelectFromLibrary';
import { closeModal } from '../../../../../stores/modalStore';

export const TextAndImageBlockEdit = ({id}) => {
  // const block = useBlockStore(state => state.getBlock(id))
  const block = useBlockStore(state => state.computed.getBlock(id))

  const { properties } = block
  
  const { debouncedUpdateBlock } = useBlockEditor()
  const updateBlock = useBlockStore(state => state.updateBlock)
  const blockRef = useBlockStore(state => state.blockRefs.get(id))
  const zIndex = useBlockStore(state => state.zIndexes.get(id))

  const handleContentChange = (newValue) => {
    debouncedUpdateBlock({
      ...block,
      content: newValue
    })
  }

  useEffect(() => {
    !block.content && setTimeout(focus, 10);
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

  const selectImage = (image) => {
    const newBlock = {
      ...block,
      properties: {
        ...block.properties,
        url: image?.location,
        mediaId: image?.id
      }
    }
    updateBlock(newBlock)
    closeModal()
  }
  return (
    <>
      <Editor
        onUpdate={handleContentChange}
        onMenuShow={onMenuShow}
        onMenuHidden={onMenuHidden}
        content={block.content}
        editorClass={'mb-4'}
      />
      <ResizeableElement
        block={block}
      >
        <ImageSelectFromLibrary
          src={block.properties?.url}
          onSelect={selectImage}
        />
      </ResizeableElement> 
    </>
  );
}

export default TextAndImageBlockEdit