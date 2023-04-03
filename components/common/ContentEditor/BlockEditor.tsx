
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
import { DragOverlay, useDroppable } from "@dnd-kit/core";
import BlockContainerOverlay from "./BlockContainerOverlay";

const BlockEditor = () => {

  const blockIds = useBlockStore(state => state.blocks.map(block => block.id))
  // useWarningOnExit(isDirty)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useDroppable({
    id: "editor_pane",
    data: {
      parent: null,
      isContainer: true
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <>
      <SortableContext
        items={blockIds}
        strategy={verticalListSortingStrategy}
      >
        <div
          className="h-full w-full"
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
        >
          {blockIds.map(id => {
            return <SortableBlock key={id} id={id} />
          })}
        </div>
      </SortableContext>

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
