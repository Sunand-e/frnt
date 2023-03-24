
import { useMotionValue } from "framer-motion";
import { Reorder } from "framer-motion";
import BlockContainer from "./BlockContainer";
import BlockSelector from "./BlockSelector";
import { useRaisedShadow } from "../../../hooks/useRaisedShadow";
import { useBlockStore } from "./useBlockStore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useWarningOnExit from "../../../hooks/useWarningOnExit";
import {SortableContext, useSortable, verticalListSortingStrategy} from '@dnd-kit/sortable';
import { CSS } from "@dnd-kit/utilities";
import SortableBlock from "./SortableBlock";
import { DragOverlay } from "@dnd-kit/core";
import BlockContainerOverlay from "./BlockContainerOverlay";

const BlockEditor = () => {

  const editBlocks = useBlockStore(state => state.editBlocks)
  const blocks = useBlockStore(state => state.blocks)
  const activeDragItem = useBlockStore(state => state.activeDragItem)
  const isDirty = useBlockStore(state => state.isDirty)
  const blockIds = useBlockStore(state => state.blocks.map(block => block.id))
  const setBlocks = useBlockStore(state => state.setBlocks)
  
  const router = useRouter()
  
  // useWarningOnExit(isDirty)

  return (
    <>
      <div className="list">
        <SortableContext
          items={blockIds}
          strategy={verticalListSortingStrategy}
        >
          {blockIds.map(id => {
            return <SortableBlock key={id} id={id} />
          })}
        </SortableContext>
      </div>

      {!blockIds.length && (
      <div className={`w-full flex flex-col items-center mt-4`}>
        <div className="w-full max-w-screen-lg bg-main p-4 bg-opacity-10 border-2 border-dashed border-grey">
          <div className={`text-center text-main-secondary py-4`}>
            Select a block from the <b>Blocks</b> panel.
          </div>
          {/* <BlockSelector
            className={`text-main-secondary mb-4 flex flex-wrap gap-4 justify-center align-center items-center sm:grid-cols-3 lg:grid-cols-6 text-sm`}
            blockButtonClassName={`flex items-center space-x-2 p-2 text-center bg-white rounded-lg shadow shadow-lg`}
          /> */}
        </div>
      </div>
      )}
    </>
  );
};

export default BlockEditor
