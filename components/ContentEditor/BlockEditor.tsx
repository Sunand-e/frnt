import ReactDOM from "react-dom"
import React, { useContext, useEffect, useState } from "react"
import { Flipper, Flipped } from "react-flip-toolkit"
import shuffle from "lodash.shuffle"
import { arrayMove } from "@dnd-kit/sortable";
import cache, { currentContentItemVar, scormDataVar } from "../../graphql/cache";
import { ContentFragment } from "../../graphql/queries/allQueries";
import { useDebouncedCallback } from 'use-debounce';
import { ModalContext } from "../../context/modalContext";
import BlockContainer from "./BlockContainer";
import DeleteContentBlockModal from "../admin/courses/DeleteContentBlockModal";
import BlockSelector from "./BlockSelector";
import blocktypes from "./blocktypes"; 
import { v4 as uuidv4 } from 'uuid';
import { useReactiveVar } from "@apollo/client";
import useBlockEditor from "./useBlockEditor";
import { motion, AnimatePresence } from "framer-motion"
// import "./styles.css";

const BlockEditor = () => {

  const { blocks, blockIds } = useBlockEditor()
  
  const scormData = useReactiveVar(scormDataVar)
  return (
    <>
      <Flipper
        flipKey={blockIds.join("")}
        // onComplete={(data) => null}
      >
        <div className="list">
          {blockIds.map((blockId, idx) => {
            const block = blocks.find(block => block.id === blockId)
            return (
              <Flipped translate flipId={blockId} key={idx}>
                <div className="flipped-container">
                  <BlockContainer
                    // onClick={() => activeContentBlockVar(block.id)}
                    block={block}
                    key={block.id}
                  />
                </div>
              </Flipped>
          )})}
        </div>
      </Flipper>

      <div className="
    flex items-center py-2 h-10
    before:flex-grow before:border-t-2
    after:flex-grow after:border-t-2
  ">
          <AnimatePresence>
        { blocks.length === 0 &&
          <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={`text-center`}
          >Add your first block
          </motion.div>
        }
      </AnimatePresence>
  </div>
        
      <BlockSelector style={{}} />
    </>
  );
};

export default BlockEditor
