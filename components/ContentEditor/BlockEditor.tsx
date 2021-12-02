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

const BlockEditor = () => {
  console.log('block editor rendering')

  // *** The below code needs to be refactored, it is used in various components: ***
  const { id, type, updateFunction } = currentContentItemVar()
  const [dragging, setDragging] = useState(false)
  
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

  const activeBlock = useReactiveVar(activeContentBlockVar);

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
  }, 600);
 
  const deleteBlock = block => {
    console.log('deleteBlock', block)
    const newBlocks = blocks.filter(b => b.id !== block.id)
    updateFunction(newBlocks)
  }

  const activeIndex = activeBlock ? blocks.findIndex(({id}) => id === activeBlock) : -1;

  const { handleModal } = useContext(ModalContext);

  const handleDeleteBlockModal = (block) => {
    handleModal({
      title: `Delete ${block.type}`,
      content: <DeleteContentBlockModal onDelete={() => deleteBlock(block)} block={block} />
    })
  }


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragStart={({active}) => {
          setDragging(true)
          console.log('active.id')
          console.log(active.id)
          if (!active) {
            return;
          }
          
          activeContentBlockVar(active.id);
        }}
        onDragEnd={handleDragEnd}
        onDragCancel={() => activeContentBlockVar(null)}
      >
        <SortableContext 
          items={blocks}
          strategy={verticalListSortingStrategy}
        >
          {blocks.map((block) => {
            return <SortableBlock
              onUpdateBlock={debouncedUpdateBlock}
              dragging={dragging}
              // onClick={() => activeContentBlockVar(block.id)}
              // active={activeBlock === block.id}
              // onUpdateBlock={updateBlock}
              block={block}
              // setBlocks={() => false}
              key={block.id}
              onRemove={() => handleDeleteBlockModal(block)}
            />
          })}
        </SortableContext>
        { createPortal(
          <DragOverlay
            // adjustScale={adjustScale}
            // dropAnimation={dropAnimation}
          >
            {activeContentBlockVar() ? (
              
              <Block
                block={blocks[activeIndex]}
                dragOverlay={true}
                onUpdateBlock={() => false}
              />
            ) : null}
          </DragOverlay>,
          document.body
        ) }
      </DndContext>
      <BlockSelector targetIndex={blocks.length} onAddBlock={(insertBlockAtIndex)} />
      {/* <BlockSelector targetIndex={blocks.length} setBlocks={() => false} /> */}
      
        {/* <pre>
          {JSON.stringify(blocks,null,2)}
        </pre> */}
       
    </>
  );
  
  function handleDragEnd(event) {
    const {active, over} = event;

    setDragging(false)
    // activeContentBlockVar(null);

    if (over) {
      const overIndex = blocks.findIndex(({id}) => id === over.id);
      if (activeIndex !== overIndex) {
        const newBlocks = arrayMove(blocks, activeIndex, overIndex);
        updateFunction(newBlocks);
      }
    }

  }
}

export default BlockEditor
