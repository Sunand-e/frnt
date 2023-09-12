import React, { useEffect, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { Item } from '../../common/dnd-kit';
import { UniqueIdentifier } from '@dnd-kit/core';
import { useMountStatus } from '../../../hooks/useMountStatus';

interface SortableItemProps {
  containerId?: UniqueIdentifier;
  id: UniqueIdentifier;
  index: number;
  handle?: boolean;
  disabled?: boolean;
  style?(args: any): React.CSSProperties;
  renderItem(): React.ReactElement;
  wrapperStyle?({index}: {index: number}): React.CSSProperties;
}

export function SortableItem({
  disabled, id, index, handle, renderItem, wrapperStyle,
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
        opacity: isDragging ? 0.5 : undefined,
      }}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
      renderItem={renderItem} />
  );
}
