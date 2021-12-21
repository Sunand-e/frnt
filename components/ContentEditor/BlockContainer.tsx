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

  // const [isActive, setIsActive] = useState(isPlateFocused)
  // console.log('block.parent')
  // console.log(block.parent)
  const isActive = activeContentBlockVar() === block.id

  return (
    <div
      className={`${isColumn && 'group h-full'} hover:bg-opacity-5 hover:bg-main relative`}
      // onClick={() => setIsActive(true)}
      // onClick={() => activeContentBlockVar(block.id)}
    >
      {/* { type } */}
      <span className={`absolute ${isColumn ? 'z-5 right-2 top-2' : '-right-14'}`}>
      {/* <span className={`absolute -right-14`}> */}

        <BlockMenu
          block={block}
          className={isColumn && `bg-white rounded group-hover:block`}
          // handle={handle}
        />

      </span>

      { isActive && type === 'text' ? (
        <Tippy
          interactive={true}
          theme="light"
          content={(
            <StyledHeadingToolbar >
              <Toolbar />
            </StyledHeadingToolbar>
          )}
        >
          <div>
            <Block block={block} />
          </div>
        </Tippy>
      ) : (
        <Block block={block} />
      )}

    </div>
  );
}

export default BlockContainer