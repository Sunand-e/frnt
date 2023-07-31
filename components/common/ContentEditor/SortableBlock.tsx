import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef } from "react";
import { useMountStatus } from "../../../hooks/useMountStatus";
import BlockContainer from "./BlockContainer";
import { useBlockStore } from "./useBlockStore";
import { useEditorViewStore } from "./useEditorViewStore";

const SortableBlock = ({id, index}) => {
  // const draggingRowHeight = useBlockStore(state => state.draggingRowHeight)
  const activeDragItem = useBlockStore(state => state.activeDragItem)
  const lastAddedItemId = useBlockStore(state => state.lastAddedItemId)
  
  const blockRefs = useBlockStore(state => state.blockRefs)
  const zIndexes = useBlockStore(state => state.zIndexes)

  const {
    setNodeRef, node, attributes, listeners, isDragging, isSorting, over, overIndex, transform, transition,
  } = useSortable({
    id,
    disabled:true,
    data: { 
      index,
      id,
      type: 'block',
      modifiers: [restrictToVerticalAxis]
   }
  });

  useEffect(() => {
    if(lastAddedItemId === id) {
      // alert(lastAddedItemId)
      // alert(node)
      // node.current?.scrollIntoView({behavior:'smooth'})
      // window.scrollTo({top: node.current.offsetTop,behavior:'smooth'})
      useBlockStore.setState({activeBlockId: id})
      useEditorViewStore.setState({activeSettingsPanel: 'block'})

    }
  },[lastAddedItemId])

  const zIndex = 9999-index
  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition,
    position: 'relative',
    zIndex
    // ...(isDragging && { height: draggingRowHeight } ) 
  }

  return (
    <div
      style={style}
      // ref={disabled ? undefined : setNodeRef}
      className={id === activeDragItem?.id ? 'invisible' : ''}
      ref={el => {
        setNodeRef(el)
        if(el) {
          blockRefs.set(id, el)
          zIndexes.set(id, `${zIndex}`)
        } else {
          blockRefs.delete(id)
        }
      }}
      {...attributes}
    >
      <BlockContainer id={id} dragListeners={listeners} />
    </div>
  )
}

export default SortableBlock