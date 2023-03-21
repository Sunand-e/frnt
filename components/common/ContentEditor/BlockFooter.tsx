import React, { useRef, useState } from 'react'
import { activeContentBlockVar } from '../../../graphql/cache'
import BlockSelector from './BlockSelector'
import { useReactiveVar } from '@apollo/client'
import LineWithIcon from '../../common/LineWithIcon'
import useOutsideClick from '../../../hooks/useOutsideClick'
import { motion, AnimatePresence } from "framer-motion"

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
            // initial={{ opacity: 0, height: 0 }}
            // animate={{ opacity: 1, height: 'auto' }}
            // exit={{ opacity: 0, height: 0 }}
          >
            <BlockSelector 
              style={{}} 
              block={block}
              onSelect={() => setShowBlockSelector(false)}
              className={`mb-4 flex flex-wrap gap-4 justify-center align-center items-center sm:grid-cols-3 lg:grid-cols-6 text-sm`}
            />
          </motion.div>
        }
        </AnimatePresence>
      </div>
    </>
  );
}

export default BlockFooter