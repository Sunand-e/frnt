import React from 'react';
import {useDroppable, UniqueIdentifier} from '@dnd-kit/core';
import classNames from 'classnames';

import styles from '../dnd-kit/Droppable/Droppable.module.scss';
import Editor from './Editor';

interface Props {
  dragging: boolean;
}

export function DroppableEditor({dragging}: Props) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'editor',
  });

  return (
    <div
      ref={setNodeRef}
      className={classNames(
        styles.Droppable,
        isOver && styles.over,
        dragging && styles.dragging
      )}
      aria-label="Droppable region"
    >
      <Editor />
      <Editor />
    </div>
  );
}
