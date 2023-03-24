import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMountStatus } from "../../../hooks/useMountStatus";
import BlockContainer from "./BlockContainer";
import { useBlockStore } from "./useBlockStore";

const SortableBlock = ({id}) => {
  
  // const draggingRowHeight = useBlockStore(state => state.draggingRowHeight)
  const activeDragItem = useBlockStore(state => state.activeDragItem)

  const {
    setNodeRef, listeners, isDragging, isSorting, over, overIndex, transform, transition,
  } = useSortable({
    id,
    data: { 
      type: 'block',
      modifiers: [restrictToVerticalAxis]
   }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition,
    // ...(isDragging && { height: draggingRowHeight } ) 
  };

  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;
 
  return (
    <div
      style={style}
      // ref={disabled ? undefined : setNodeRef}
      className={id === activeDragItem?.id && 'invisible'}
      ref={setNodeRef}
    >
      <BlockContainer id={id} dragListeners={listeners} />
    </div>
  )
}

export default SortableBlock