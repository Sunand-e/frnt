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
  
  // const [isActive, setIsActive] = useState(isPlateFocused)
  // console.log('block.parent')
  // console.log(block.parent)
  const isActive = useReactiveVar(activeContentBlockVar) === block.id

  return (
    <div
      className={`${isColumn ? 'h-full' : ''} group relative flex flex-col items-center hover:bg-opacity-5 hover:bg-main`}

      // onClick={() => setIsActive(true)}
      onClick={() => activeContentBlockVar(block.id)}
    >
      {/* { type } */}
      <span className={`absolute z-10 right-2 top-2`}>
      {/* <span className={`absolute -right-14`}> */}

        <BlockMenu
        
          block={block}
          className={`
            ${!isActive && 'block'}
            ${!isColumn && 'bg-white rounded hidden group-hover:block'}
          `}
          // handle={handle}
        />

      </span>
      <BlockEdit block={block} />
      {
        (!parent && index !== blocks.length -1) && <BlockFooter block={block} />
      }
    </div>
  );
}

export default React.memo(BlockContainer)