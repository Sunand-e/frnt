import React, { useRef, useState } from 'react'
import BlockSelector from './BlockSelector'
import LineWithIcon from '../../common/LineWithIcon'
import useOutsideClick from '../../../hooks/useOutsideClick'
import { motion, AnimatePresence } from "framer-motion"
import { useBlockStore } from './useBlockStore'

const BlockFooter = ({block}) => {

  const activeBlockId = useBlockStore(state => state.activeBlockId)
  
  const isActive = activeBlockId === block.id

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
              blockButtonClassName = {`
                flex flex-none justify-center items-center
                space-x-2 p-3 text-center text-main
                bg-white rounded-lg
                shadow shadow-lg
                mb-3
              `}
            />
          </motion.div>
        }
        </AnimatePresence>
      </div>
    </>
  );
}

export default BlockFooter