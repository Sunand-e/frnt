import React, { useRef, useState } from 'react'
import {CSS} from '@dnd-kit/utilities'
import { Block } from './Block'
import styles from '../dnd-kit/Container/Container.module.scss'

import { usePlateEventId } from '@udecode/plate-core'
import { HeadingToolbar } from '@udecode/plate-toolbar'
import { Toolbar } from './blocks/TextBlock/Toolbar'
import styled from 'styled-components'
import { activeContentBlockVar } from '../../graphql/cache'
import BlockSelector from './BlockSelector'
import { useReactiveVar } from '@apollo/client'
import LineWithIcon from '../LineWithIcon'
import useOutsideClick from '../../hooks/useOutsideClick'

const BlockFooter = ({
  block,
}) => {
  const isActive = useReactiveVar(activeContentBlockVar) === block.id
  const [ showBlockSelector, setShowBlockSelector ] = useState(false)

  const outsideClickRef = useRef(null);
  useOutsideClick(outsideClickRef, () => setShowBlockSelector(false));

  return (
    <>
      <div
        className={`h-12 text-main opacity-0 max-w-screen-lg items-center group-hover:opacity-100 w-full ${showBlockSelector && 'opacity-100'}`}
        onClick={() => setShowBlockSelector(showBlockSelector => !showBlockSelector)}
        >
        <LineWithIcon />
      </div>
      <div ref={outsideClickRef} className={`${showBlockSelector ? 'max-h-24' : 'max-h-0'} transition-max-h duration-1000 ease-out overflow-hidden pb-2`}>
        { showBlockSelector &&
          <BlockSelector block={block} />
        }
      </div>
    </>
  );
}

export default BlockFooter