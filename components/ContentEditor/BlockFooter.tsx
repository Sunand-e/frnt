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
import { useDelayUnmount } from '../../hooks/useDelayUnmount'
import { motion, AnimatePresence } from "framer-motion"
import useBlockEditor from './useBlockEditor';

const BlockFooter = ({block}) => {
  const isActive = useReactiveVar(activeContentBlockVar) === block.id

  const outsideClickRef = useRef(null);
  
  const [ showBlockSelector, setShowBlockSelector ] = useState(false);

  useOutsideClick(outsideClickRef, () => setShowBlockSelector(false));

  return (
    <>
      <div
        className={`text-main opacity-0 max-w-screen-lg self-center group-hover:opacity-100 w-full ${showBlockSelector && 'opacity-100'}`}
        onClick={() => setShowBlockSelector(!showBlockSelector)}
        >
        <LineWithIcon />
      </div>
      <div ref={outsideClickRef} className={`${showBlockSelector ? 'max-h-24' : 'max-h-0'} transition-max-h w-full duration-1000 ease-out overflow-hidden`}>
      {/* <div ref={outsideClickRef} className={`w-full overflow-hidden pb-2`}> */}
        {/* { showBlockSelector && */}
        <AnimatePresence>
        { showBlockSelector &&
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <BlockSelector 
              style={{}} 
              block={block}
              onSelect={() => setShowBlockSelector(false)}
            />
          </motion.div>
        }
        </AnimatePresence>
      </div>
    </>
  );
}

export default BlockFooter