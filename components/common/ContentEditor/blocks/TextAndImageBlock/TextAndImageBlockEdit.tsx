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

  const handleContentChange = (newValue) => {
    debouncedUpdateBlock({
      ...block,
      content: newValue
    })
  }

  useEffect(() => {
    !block.content && setTimeout(focus, 10);
  },[])
   
  // Temporary(!!!) z-index fix for textAndImage blocks inside a carousel;
  const onMenuShow = (instance) => {
    if(blockRef) {
      const closestCarouselViewport = blockRef.closest('[data-scope="carousel"][data-part="viewport"]')
      const carouselControls = closestCarouselViewport.querySelector('[data-part="previous-trigger"]')
      carouselControls.style.zIndex = '0'
    }
  }
  
  const onMenuHidden = (instance) => {
    if(blockRef) {
      const closestCarouselViewport = blockRef.closest('[data-scope="carousel"][data-part="viewport"]')
      const carouselControls = closestCarouselViewport.querySelector('[data-part="previous-trigger"]')
      carouselControls.style.removeProperty('z-index')
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
        autofocus={false}
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