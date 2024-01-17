import QuestionTextEditor from './QuestionTextEditor';
import OptionContainer from './OptionContainer';
import { Answer, Question, useQuizStore } from '../useQuizStore';
import { TriangleDown } from '@styled-icons/octicons/TriangleDown'

type QuestionProps = {
  question: Question
  disabled: boolean
  onQuestionChange?: (content: JSON) => void
  onOptionChange?: (option: Answer, content: JSON) => void
  onOptionSelect?: (option: Answer, value: boolean) => void
  onRemoveOption?: (option: Answer) => void
  onAddOption?: () => void,
  selectedOptionIds?: Array<string>
}
const QuestionContainer = ({
  question,
  disabled,
  onQuestionChange,
  onOptionChange,
  onOptionSelect,
  onRemoveOption,
  onAddOption,
  selectedOptionIds
 }: QuestionProps) => {
  
  const isEditMode = useQuizStore(state => state.isEditMode)

  return (
    <div className="w-full mb-2">
      <div className="flex items-center space-x-4 mb-2">
        <QuestionTextEditor 
          key={question.id+(isEditMode ? 'edit' : 'read')} 
          content={question.content} 
          onChange={onQuestionChange}
        />
      </div>
      
      { isEditMode && (
        <div className='uppercase text-xs text-main opacity-80'>
          <div className='w-full pt-1'>Correct?</div>
          {/* <div className='w-full h-2 px-4 relative -top-1.5'><TriangleDown className='w-5' /></div> */}
        </div>
      )}
      
      {question.answers.map((option, index) => {
        const selected = (isEditMode) ? option.correct : selectedOptionIds?.includes(option.id)
        return (
          <OptionContainer
            disabled={disabled}
            key={option.id+isEditMode}
            question={question}
            option={option}
            onChange={onOptionChange}
            onSelectedChange = {(e) => !!onOptionSelect && onOptionSelect(option, e.target.checked)}
            onRemove={onRemoveOption}
            selected={selected}
          />
        )
      })}
      
      { isEditMode && (
        <button onClick={onAddOption} className="text-main hover:font-bold ml-4 mt-2">
          + Add answer
        </button>
      )}
    </div>
  );
}

export default QuestionContainer