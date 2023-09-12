import {Trash} from '@styled-icons/heroicons-outline/Trash'
import { useQuizStore } from '../useQuizStore';

const QuestionContainer = ({question, onSelect=null, onRemove, index}) => {
  
  const activeQuestionId = useQuizStore(state => state.activeQuestionId)
  const active = question.id === activeQuestionId

  const questionText = question.content?.content?.find(c => (
    ['heading', 'paragraph'].includes(c.type)
  )).content?.find(c => 'text' in c)?.text

  return (
    <div 
      key={question.id} 
      className={`
        group/question p-2 flex space-x-4 items-center
        ${active ? 'bg-opacity-10 bg-main' : ''}
        hover:bg-opacity-5 hover:bg-main w-full
      `}
    >
      <div
        onClick={() => onSelect(question.id)}
        // className="space-x-2 w-full line-clamp-1"
        className="space-x-2 w-full"
      >
        <span className=''>Question {index+1}{questionText && ':'} </span>
        <span className=' text-gray-400 line-clamp-1'>{questionText}</span>
      </div>
      <div className="ml-auto opacity-0 h-7 flex space-x-2 opacity-0 group-hover/question:opacity-100 " onClick={() => onRemove(question)}>
        <Trash className={`w-4 cursor-pointer hover:scale-125 text-red-800`} />
      </div>
    </div>
  )
}

export default QuestionContainer