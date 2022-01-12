import React, { useState } from 'react'
import {CSS} from '@dnd-kit/utilities'
import { Block } from './Block'
import styles from '../dnd-kit/Container/Container.module.scss'

import { usePlateEventId } from '@udecode/plate-core'
import { HeadingToolbar } from '@udecode/plate-toolbar'
import { Toolbar } from './blocks/TextBlock/Toolbar'
import styled from 'styled-components'
import { activeContentBlockVar } from '../../graphql/cache'
import BlockMenu from './BlockMenu/BlockMenu'
import Tippy from '@tippyjs/react'
import useBlockEditor from './useBlockEditor'
import BlockFooter from './BlockFooter'
import { useReactiveVar } from "@apollo/client";

const StyledHeadingToolbar = styled(HeadingToolbar)`
  margin-bottom: 0px;
  padding-bottom: 0px;
`

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
      className={`${isColumn ? 'h-full' : ''} group relative flex flex-col items-center`}

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
      <Block block={block} />
      {
        (!parent && index !== blocks.length -1) && <BlockFooter block={block} />
      }
    </div>
  );
}

export default React.memo(BlockContainer)