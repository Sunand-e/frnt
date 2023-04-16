import { TrashAlt } from '@styled-icons/boxicons-regular';

const QuestionContainer = ({question, editable=true, onChange=null, onRemove}) => {

  return (
    <div key={question.id} className="flex items-center mb-2 hover:bg-main hover:bg-opacity-5">
      <div className="flex items-center space-x-4 group/question">
        {question.title}
        <button onClick={() => onRemove(question)} className="text-red-500 opacity-0 group-hover/question:opacity-100 hover:text-red-600">
          <TrashAlt size={20} />
        </button>
      </div>
    </div>
  )
}

QuestionContainer.whyDidYouRender = true 

export default QuestionContainer