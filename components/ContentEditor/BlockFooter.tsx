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
import BlockSelector from './BlockSelector'

const StyledHeadingToolbar = styled(HeadingToolbar)`
  margin-bottom: 0px;
  padding-bottom: 0px;
`

const BlockFooter = ({
  block,
  isColumn = false,
  dragging = false,
  // onClick: handleClick, 
  handle = true,
}) => {
  const {id, type} = block

  const isActive = activeContentBlockVar() === block.id

  return (
    <div className={`flex flex-col justify-center`}>
      <BlockSelector block={block} />
    </div>
  );
}

export default BlockFooter