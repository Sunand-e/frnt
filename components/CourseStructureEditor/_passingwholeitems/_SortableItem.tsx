import React, { useEffect, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { Item } from './components';
import { getColor } from './MultipleContainers';

interface SortableItemProps {
  containerId: string;
  item: any;
  index: number;
  handle: boolean;
  disabled?: boolean;
  style(args: any): React.CSSProperties;
  getIndex(id: string): number;
  renderItem(): React.ReactElement;
  wrapperStyle({index}: {index: number}): React.CSSProperties;
}

export function SortableItem({
  disabled, item, index, handle, renderItem, style, containerId, getIndex, wrapperStyle,
}: SortableItemProps) {
  const {
    setNodeRef, listeners, isDragging, isSorting, over, overIndex, transform, transition,
  } = useSortable({
    id: item.id,
  });
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  return (
    <Item
      ref={disabled ? undefined : setNodeRef}
      value={item.title}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      index={index}
      wrapperStyle={wrapperStyle({ index })}
      style={style({
        index,
        value: item.id,
        isDragging,
        isSorting,
        overIndex: over ? getIndex(over.id) : overIndex,
        containerId,
      })}
      color={getColor(item)}
      transition={transition}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
      renderItem={renderItem} />
  );
}

function useMountStatus() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500);

    return () => clearTimeout(timeout);
  }, []);

  return isMounted;
}
