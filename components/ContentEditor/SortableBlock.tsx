import React, { useState } from 'react'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import { Block } from './Block'
import styles from '../dnd-kit/Container/Container.module.scss'

import { usePlateEventId } from '@udecode/plate-core'
import { HeadingToolbar } from '@udecode/plate-toolbar'
import { Toolbar } from './blocks/TextBlock/Toolbar'
import styled from 'styled-components'
import { activeContentBlockVar } from '../../graphql/cache'
import BlockMenu from './BlockMenu'
import Tippy from '@tippyjs/react'

const StyledHeadingToolbar = styled(HeadingToolbar)`
  margin-bottom: 0px;
  padding-bottom: 0px;
`

const SortableBlock = ({
  block, 
  onUpdateBlock, 
  dragging = false,
  // onClick: handleClick, 
  handle = true,
  onRemove = () => {}
}) => {
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
  
  // const [isActive, setIsActive] = useState(isPlateFocused)

  const isActive = activeContentBlockVar() === block.id
  const isBeingDragged = dragging && isActive
  console.log('isBeingDragged')
  console.log(isBeingDragged)

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
      className={`hover:bg-opacity-5 hover:bg-main relative ${isBeingDragged && 'opacity-50'}`}
      // onClick={() => setIsActive(true)}
      onClick={() => activeContentBlockVar(block.id)}
    >
    <span className={`absolute -right-14`}>
      <BlockMenu
        id={id}
        onRemove={onRemove}
        handle={handle}
       />
    </span>
      { isActive && type === 'text' ? (
        <Tippy
        interactive={true}
        theme={'light'}
        content={(
          <StyledHeadingToolbar >
            <Toolbar />
          </StyledHeadingToolbar>
          )}
        >
            <div>
          <Block block={block} onUpdateBlock={handleUpdateBlock} />
            </div>
        </Tippy>
      ) : (
        <Block block={block} onUpdateBlock={handleUpdateBlock} />
      )}

    </div>
  );
}

export default SortableBlock