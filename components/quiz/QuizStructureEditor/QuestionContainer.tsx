import { TrashAlt } from '@styled-icons/boxicons-regular';
import {Trash} from '@styled-icons/heroicons-outline/Trash'

const QuestionContainer = ({question, editable=true, active=false, onSelect=null, onRemove, index}) => {

  const questionText = question.content?.content?.find(c => (
    ['heading', 'paragraph'].includes(c.type)
  )).content?.find(c => 'text' in c)?.text

  return (
    <div 
      key={question.id} 
      className={`
        group/question p-2 flex space-x-4 items-center mb-2
        ${active ? 'bg-opacity-10 bg-main' : ''}
        hover:bg-opacity-5 hover:bg-main w-full
      `}
    >
      <span 
        onClick={() => onSelect(question.id)}
        className="space-x-2 w-full line-clamp-1"
      >
        <span className='inline'>Question {index+1}: </span>
        <span className='inline  text-gray-400'>{questionText}</span>
      </span>
      <div className="ml-auto opacity-0 h-7 flex space-x-2 opacity-0 group-hover/question:opacity-100 " onClick={() => onRemove(question)}>
        <Trash className={`w-4 cursor-pointer`}/>
      </div>
    </div>
  )
}

export default QuestionContainer