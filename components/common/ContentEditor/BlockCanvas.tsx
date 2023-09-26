
import { useBlockStore } from "./useBlockStore";
import SortableBlock from "./SortableBlock";
import { useDroppable } from "@dnd-kit/core";
import { showBlocksPanel, useEditorViewStore } from "./useEditorViewStore";
import BlockSelector from "./BlockSelector";
import React, { useEffect, useMemo } from "react";

const BlockCanvas = () => {

  const blocks = useBlockStore(state => state.blocks)
  const blockIds = blocks.map(block => block.id)
  // const blockIds = useBlockStore(state => state.blocks.map(block => block.id))
  const activeBlockId = useBlockStore(state => state.activeBlockId)
  const blockRef = useBlockStore(state => state.blockRefs.get(state.activeBlockId))
  const lastAddedItemId = useBlockStore(state => state.lastAddedItemId)

  useEffect(() => {
      useBlockStore.setState({activeBlockId: lastAddedItemId})
      useEditorViewStore.setState({activeSettingsPanel: 'block'})
  },[lastAddedItemId])

  useEffect(() => {
    blockRef && blockRef.scrollIntoView({
      behavior: 'smooth',
    })
  },[blockRef])

  // const {
  //   setNodeRef,
  // } = useDroppable({
  //   id: "editor_pane",
  //   data: {
  //     parent: null,
  //     isContainer: true
  //   }
  // });
  // console.log('blockIds')
  // console.log(blockIds)
  return (
    <div
      className="min-h-full w-full bg-main-lightness-99"
      onClick={showBlocksPanel}
      // ref={setNodeRef}
    >
      
      {!blockIds.length ? (
        <div className={`p-12 flex justify-center`}>
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
      ) : (
        <div className="pb-24">
          { blockIds.map((id, index) => {
            return <SortableBlock key={id} id={id} index={index} />
          })}
          {/* <BlockSelector
            className={`mb-4 flex flex-wrap gap-4 justify-center align-center items-center sm:grid-cols-3 lg:grid-cols-6 text-sm`}
            blockButtonClassName = {`
              flex flex-none justify-center items-center
              space-x-2 p-3 text-center text-main
              bg-white rounded-lg
              shadow shadow-lg
              mb-3
            `}
          /> */}
        </div>
      )}
    </div>
  );
};

export default BlockCanvas
