import { TrashAlt } from '@styled-icons/boxicons-regular';

const QuestionContainer = ({question, editable=true, onSelect=null, onRemove, index}) => {

  return (
    <div key={question.id} className="flex items-center mb-2 hover:bg-main hover:bg-opacity-5">
      <div className="flex items-center space-x-4 group/question">
        <span 
          onClick={() => onSelect(question.id)}
          className="flex space-x-2"
        >
          <span>{index+1}: </span>
          <span className='line-clamp-1 text-gray-400'>{question.content}</span>
        </span>
        <button onClick={() => onRemove(question)} className="text-red-500 opacity-0 group-hover/question:opacity-100 hover:text-red-600">
          <TrashAlt size={20} />
        </button>
      </div>
    </div>
  )
}

QuestionContainer.whyDidYouRender = true 

export default QuestionContainer