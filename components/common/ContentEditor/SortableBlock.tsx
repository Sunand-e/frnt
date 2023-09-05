import React from "react";
import BlockContainer from "./BlockContainer";
import { useBlockStore } from "./useBlockStore";

const SortableBlock = ({id, index, isActive}) => {
  // const draggingRowHeight = useBlockStore(state => state.draggingRowHeight)
  const activeDragItem = useBlockStore(state => state.activeDragItem)
  
  const blockRefs = useBlockStore(state => state.blockRefs)
  const zIndexes = useBlockStore(state => state.zIndexes)

  // const {
  //   setNodeRef, node, attributes, listeners, isDragging, isSorting, over, overIndex, transform, transition,
  // } = useSortable({
  //   id,
  //   disabled:true,
  //   data: { 
  //     index,
  //     id,
  //     type: 'block',
  //     modifiers: [restrictToVerticalAxis]
  //  }
  // });

  // useEffect(() => {
  //   if(lastAddedItemId === id) {
  //     useBlockStore.setState({activeBlockId: id})
  //     useEditorViewStore.setState({activeSettingsPanel: 'block'})

  //   }
  // },[lastAddedItemId])

  const zIndex = 9999-index
  const style = {
    // transform: CSS.Translate.toString(transform),
    // transition: transition,
    position: 'relative',
    zIndex
    // ...(isDragging && { height: draggingRowHeight } ) 
  }

  return (
    <div
      style={style}
      className={id === activeDragItem?.id ? 'invisible' : ''}
      ref={el => {
        // setNodeRef(el)
        if(el) {
          blockRefs.set(id, el)
          zIndexes.set(id, `${zIndex}`)
        } else {
          blockRefs.delete(id)
        }
      }}
      // {...attributes}
    >
      {/* <BlockContainer id={id} dragListeners={listeners} /> */}
      <BlockContainer isActive={isActive} id={id} />
    </div>
  )
}

export default React.memo(SortableBlock)