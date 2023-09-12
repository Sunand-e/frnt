import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import QuestionContainer from "./QuestionContainer";

const SortableQuestion = ({question, editable=true, onSelect=null, onRemove, index}) => {

  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging,
  } = useSortable({
    id: question.id
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
      <QuestionContainer
        onSelect={onSelect}
        key={question.id}
        question={question}
        index={index}
        onRemove={onRemove}
      />
    </div>
  )
}
export default SortableQuestion