import React, { useState } from 'react'
import { activeContentBlockVar } from '../../graphql/cache'
import BlockMenu from './BlockMenu'
import useBlockEditor from './useBlockEditor'
import BlockFooter from './BlockFooter'
import { useReactiveVar } from "@apollo/client";
import { BlockEdit } from './BlockEdit'

const BlockContainer = ({
  block,
  isColumn = false,
  dragging = false,
  // onClick: handleClick, 
  handle = true,
}) => {
  const {id, type} = block

  const { blocks, getIndexAndParent } = useBlockEditor()
  const { index, parent } = getIndexAndParent(block)

  const isActive = useReactiveVar(activeContentBlockVar) === block.id
  
  return (
    <div className='group flex flex-col'>
      <div
        className={`
        ${isColumn ? 'h-full' : 'group-hover:bg-opacity-5 hover:bg-main'}
        ${parent?.id ? 'px-4' : ''}
        relative flex flex-col items-center
      `}
        onClick={() => activeContentBlockVar(block.id)}
      >
        <span className={`absolute z-10 right-2 top-2`}>
        {/* <span className={`absolute -right-14`}> */}
          <BlockMenu
            block={block}
            className={`
              ${!isActive && 'block'}
              ${!isColumn && 'bg-white rounded hidden group-hover:block'}
            `}
          />

        </span>
        <BlockEdit block={block} />
      </div>
      {
        (!isColumn && index !== blocks.length -1) && <BlockFooter block={block} />
      }
    </div>
  );
}

export default React.memo(BlockContainer)