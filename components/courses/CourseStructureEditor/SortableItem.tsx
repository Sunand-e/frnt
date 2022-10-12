import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { Item } from '../../common/dnd-kit';
import { SortableItemProps, useMountStatus } from './MultipleContainers';

export function SortableItem({
  disabled, id, index, handle, renderItem, style, containerId, getIndex, wrapperStyle,
}: SortableItemProps) {
  const {
    setNodeRef, listeners, isDragging, isSorting, over, overIndex, transform, transition,
  } = useSortable({
    id,
  });
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      id={id}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      index={index}
      wrapperStyle={wrapperStyle({ index })}
      style={{
        ...style({
          index,
          id: id,
          isDragging,
          isSorting,
          overIndex: over ? getIndex(over.id) : overIndex,
          containerId,
        }),
        opacity: isDragging ? 0.5 : undefined,
      }}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
      renderItem={renderItem} />
  );
}
