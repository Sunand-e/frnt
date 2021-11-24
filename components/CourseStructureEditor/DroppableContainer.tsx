import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import { Container, ContainerProps } from '../dnd-kit';
import {
  AnimateLayoutChanges,
  useSortable,
  defaultAnimateLayoutChanges,
} from '../dnd-kit/sortable/dist';

import NewItemButton from './NewItemButton'

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  args.isSorting || args.wasDragging ? defaultAnimateLayoutChanges(args) : true;

export function DroppableContainer({
  children, columns = 1, disabled, id, items, style, ...props
}: ContainerProps & {
  disabled?: boolean;
  id: string;
  items: string[];
  style?: React.CSSProperties;
}) {
  const {
    active, attributes, isDragging, listeners, over, setNodeRef, transition, transform,
  } = useSortable({
    id,
    data: {
      type: "container",
    },
    animateLayoutChanges,
  });
  const isOverContainer = over
    ? (id === over.id && active?.data.current?.type !== "container") ||
    items.includes(over.id)
    : false;

  return (
    <Container
      ref={disabled ? undefined : setNodeRef}
      style={{
        ...style,
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
      }}
      hover={isOverContainer}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      columns={columns}
      {...props}
    >
      {children}
      { id !== 'placeholder' && <NewItemButton container={id} /> }
    </Container>
  );
}
