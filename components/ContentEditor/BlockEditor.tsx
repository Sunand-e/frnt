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
import { SelectionToolbar } from "./blocks/TextBlock/SelectionToolbar";
// import "./styles.css";

const BlockEditor = () => {

  const { blocks, blockIds } = useBlockEditor()
  
  const scormData = useReactiveVar(scormDataVar)
  return (
    <>  
      <SelectionToolbar />
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
      <div className={`w-full flex flex-col items-center mt-4`}>
        <div className="w-full max-w-screen-lg bg-blue p-4 bg-opacity-10 border-2 border-dashed border-grey">
          <div className={`text-center text-main-dark font-semibold pb-4`}>
            Add a new block
          </div>
          <BlockSelector className={``} style={{}} />
        </div>
      </div>
    </>
  );
};

export default BlockEditor
