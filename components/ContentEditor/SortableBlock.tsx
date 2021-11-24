import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Block } from './Block';
import styles from '../dnd-kit/Container/Container.module.scss';
import { Handle, Remove } from '../dnd-kit';
import { usePlateEventId } from '@udecode/plate-core';
import { HeadingToolbar } from '@udecode/plate-toolbar';
import { Toolbar } from './blocks/TextBlock/Toolbar';
import styled from 'styled-components';

const StyledHeadingToolbar = styled(HeadingToolbar)`
  margin-bottom: 0px;
  padding-bottom: 0px;
`;

const SortableBlock = ({block, onUpdateBlock, handle = true, onRemove}) => {
  console.log('SortableBlock updated')
  console.log(block)
  const {id, type} = block
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  const isFocused = usePlateEventId('focus') === id;
  const handleUpdateBlock = (block) => {
    console.log('updating block from within BLOCK')   
    onUpdateBlock(block)
  }
  return (
    <div
      ref={setNodeRef} 
      style={style} 
      {...(!handle ? attributes : undefined)}
      {...(!handle ? listeners : undefined)}
      tabIndex={!handle ? 0 : undefined}
      className={`hover:bg-opacity-5 hover:bg-main`}
    >
      { isFocused && (
        <div className={`flex px-6 py-2 justify-between items-center `}>
          <div className={`flex items-center `}>
            { type === 'text' && (
              <StyledHeadingToolbar >
                <Toolbar />
              </StyledHeadingToolbar>
            )}
          </div>
          <span className={styles.Actions}>
            {onRemove ? (
              <Remove className={styles.Remove} onClick={() => onRemove(id)} />
              ) : null}
            {handle ? <Handle {...listeners} {...attributes} /> : null}
          </span>
        </div>
      )}
      <Block block={block} onUpdateBlock={handleUpdateBlock} />
    </div>
  );
}

export default SortableBlock