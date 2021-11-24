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

const BlockEditor = ({blocks, onUpdate: handleUpdate}) => {
  console.log('block editor rendering')

  // const [blocks, setBlocks] = useState(initialBlocks);


  const insertBlockAtIndex = (newBlock, targetIndex) => {
    console.log('insertBlockAtIndex', newBlock, targetIndex)
    const newBlocks = [
      ...blocks.slice(0, targetIndex),
      newBlock,
      ...blocks.slice(targetIndex)
    ]
    handleUpdate(newBlocks);
  }
  
  const updateBlock = block => {
    console.log('updateBlock', block)
    const blockIndex = blocks.findIndex(b => b.id === block.id)
    let newBlocks = [...blocks]
    newBlocks[blockIndex] = block

    handleUpdate(newBlocks);
  }

  const debouncedUpdateBlock = useDebouncedCallback((block) => {
    updateBlock(block);
  }, 2000);
 
  const deleteBlock = block => {
    console.log('deleteBlock', block)
    const newBlocks = blocks.filter(b => b.id !== block.id)
    handleUpdate(newBlocks)
  }
  
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeIndex = activeId ? blocks.findIndex(({id}) => id === activeId) : -1;

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

  console.log('blocks')
  console.log(blocks)
  return (
    <>
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragStart={({active}) => {
          console.log('active.id')
          console.log(active.id)
          if (!active) {
            return;
          }
          
          setActiveId(active.id);
        }}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <SortableContext 
          items={blocks}
          strategy={verticalListSortingStrategy}
        >
          {blocks.map((block) => {
            return <SortableBlock
              onUpdateBlock={debouncedUpdateBlock}
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
            {activeId ? (
              
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
      
        <pre>
          {JSON.stringify(blocks,null,2)}
        </pre>
       
    </>
  );
  
  function handleDragEnd(event) {
    const {active, over} = event;
    setActiveId(null);

    if (over) {
      const overIndex = blocks.findIndex(({id}) => id === over.id);
      if (activeIndex !== overIndex) {
        const newBlocks = arrayMove(blocks, activeIndex, overIndex);
        handleUpdate(newBlocks);
      }
    }

  }
}

export default BlockEditor
