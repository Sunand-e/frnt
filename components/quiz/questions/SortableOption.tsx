import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import OptionContainer from "./OptionContainer";

const SortableOption = ({option, children}) => {

  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging,
  } = useSortable({
    id: option.id
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition,
  };

  return (
    <div
      {...attributes}
      {...listeners}
      className={'group'}
      style={style}
      ref={setNodeRef}
    >
      { children }
    </div>
  )
}
export default SortableOption