import React, {useState} from 'react';
import {
  closestCenter,
  closestCorners,
  rectIntersection,
  pointerWithin,
  DndContext,
  useDraggable,
  UniqueIdentifier,
  CollisionDetection as CollisionDetectionType,
  Modifiers,
  DragStartEvent,
} from '@dnd-kit/core';

import {
  Draggable,
  DraggableOverlay,
  Droppable,
  GridContainer,
  Wrapper,
} from '../dnd-kit';
import { DroppableEditor } from './DroppableEditor';
import { v4 as uuidv4 } from 'uuid';
import Editor from './Editor';

interface Props {
  collisionDetection?: CollisionDetectionType;
  containers?: string[];
  modifiers?: Modifiers;
  value?: string;
}

const ContentCreator = ({
  collisionDetection,
  modifiers,
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);

  const item = <DraggableItem />;


  const onDragStart = (e: DragStartEvent) => {
    if (e.active.data) {
      // @ts-ignore
      e.active.data.mode = 'form'
      // @ts-ignore
      e.active.data.type = 1
    }
  }
  
  function handleDragEnd(event) {
    console.log(event) // {active: {data: {current, type: 1, mode: 'form'}}}
  }
    


  return (
    <DndContext
      collisionDetection={collisionDetection}
      modifiers={parent === null ? undefined : modifiers}
      // onDragStart={() => setIsDragging(true)}
      // onDragEnd={({over}) => {
      //   setParent(over ? over.id : null);
      //   setIsDragging(false);
      // }}
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setIsDragging(false)}
    >
      <Wrapper>
        {/* <Wrapper style={{width: 350, flexShrink: 0}}>
          {item}
        </Wrapper> */}
        <Editor />
        {/* <DroppableEditor dragging={isDragging} /> */}
      </Wrapper>
      <DraggableOverlay />
    </DndContext>
  );
}

interface DraggableProps {
  handle?: boolean;
}

function DraggableItem({handle}: DraggableProps) {
  const {isDragging, setNodeRef, listeners} = useDraggable({
    id: uuidv4(),
    data: {
      "text/plain": 'ppp'
    }
  });

  return (
    <Draggable
      dragging={isDragging}
      ref={setNodeRef}
      handle={handle}
      listeners={listeners}
      style={{
        opacity: isDragging ? 0 : undefined,
      }}
    />
  );
}

export default ContentCreator