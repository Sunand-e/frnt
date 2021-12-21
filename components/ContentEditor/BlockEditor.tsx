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
              <Flipped translate key={blockId} flipId={blockId}>
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
      <BlockSelector />
      {/* <h1>blocks</h1>
      <pre>
        { JSON.stringify(blocks, null, 2) }
      </pre> */}
    </>
  );
};

export default BlockEditor
