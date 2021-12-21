import React, {useContext, useEffect, useState} from 'react';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import SortableBlock from './SortableBlock';
import { createPortal } from 'react-dom';
import { Block } from './Block';
import BlockSelector from './BlockSelector';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { ModalContext } from '../../context/modalContext';
import DeleteContentBlockModal from '../admin/courses/DeleteContentBlockModal';
import { useDebouncedCallback } from 'use-debounce';
import cache, { activeContentBlockVar, currentContentItemVar } from '../../graphql/cache';
import { ContentFragment } from '../../graphql/queries/allQueries';
import { useReactiveVar } from '@apollo/client';
import { usePlateEventId } from '@udecode/plate-core';
import BlockContainer from './BlockContainer';
import { Flipper, Flipped } from 'react-flip-toolkit'

const BlockEditor = () => {
  console.log('block editor rendering')

  // *** The below code needs to be refactored, it is used in various components: ***
  const { id, type, updateFunction } = currentContentItemVar()
  
  const contentData = cache.readFragment({
    id:`ContentItem:${id}`,
    fragment: ContentFragment,
    // fragmentName: 'SectionFragment'
  })

  // const focusedPlateEditor = usePlateEventId('focus');

  // useEffect(() => {
  //   activeContentBlockVar(focusedPlateEditor)
  // }, [focusedPlateEditor])

  const blocks = contentData.content?.blocks || []
  // *** END of code to be refactored ***

  // const activeBlock = useReactiveVar(activeContentBlockVar);

  // *** The below code needs to be refactored, it is used in various components: ***
  const insertBlockAtIndex = (newBlock, targetIndex) => {
    console.log('insertBlockAtIndex', newBlock, targetIndex)
    const newBlocks = [
      ...blocks.slice(0, targetIndex),
      newBlock,
      ...blocks.slice(targetIndex)
    ]
    updateFunction(newBlocks);
  }
  // *** END of code to be refactored ***
  
  const updateBlock = block => {
    console.log('updateBlock', block)
    const blockIndex = blocks.findIndex(b => b.id === block.id)
    let newBlocks = [...blocks]
    newBlocks[blockIndex] = block

    updateFunction(newBlocks);
  }

  const debouncedUpdateBlock = useDebouncedCallback((block) => {
    updateBlock(block);
  }, 2000);
 
  const deleteBlock = block => {
    console.log('deleteBlock', block)
    const newBlocks = blocks.filter(b => b.id !== block.id)
    updateFunction(newBlocks)
  }

  // const activeIndex = activeBlock ? blocks.findIndex(({id}) => id === activeBlock) : -1;

  const { handleModal } = useContext(ModalContext);

  const handleDeleteBlockModal = (block) => {
    handleModal({
      title: `Delete ${block.type}`,
      content: <DeleteContentBlockModal onDelete={() => deleteBlock(block)} block={block} />
    })
  }

  const [flipArray, setFlipArray] = useState(blocks.map(block => block.id))

  return (
    <>
      <Flipper 
        flipKey={flipArray.map(block => block.id).join("")}
        onComplete={(newBlockArray) => {
          console.log('newBlockArray')
          console.log(newBlockArray)
          // const newBlocks = newBlockArray.map(blockId => blocks.find(block => block.Id === blockId))
          // updateFunction();
        }}
      >
        {flipArray.map((blockId, idx) => {
          const block = blocks.find(block => block.id === blockId)
          return (
            <Flipped key={block.id} flipId={block.id}>
              <div>
              <span onClick={() => {
                arrayMove(flipArray, idx, idx-1)
              }}>Up</span>
               / 
              <span onClick={() => {
                setFlipArray(arrayMove(flipArray, idx, idx+1))
                
              }}>Down</span>
              <BlockContainer
                onUpdateBlock={debouncedUpdateBlock}
                // onClick={() => activeContentBlockVar(block.id)}
                // active={activeBlock === block.id}
                // onUpdateBlock={updateBlock}
                block={block}
                // setBlocks={() => false}
                key={block.id}
                onRemove={() => handleDeleteBlockModal(block)}
                />
                </div>
            </Flipped>
          )
        })}
      </Flipper>
      <BlockSelector indices={[blocks.length]} onAddBlock={(insertBlockAtIndex)} />
      {/* <BlockSelector targetIndex={blocks.length} setBlocks={() => false} /> */}
      
        {/* <pre>
          {JSON.stringify(blocks,null,2)}
        </pre> */}
       
    </>
  );
  
}

export default BlockEditor
