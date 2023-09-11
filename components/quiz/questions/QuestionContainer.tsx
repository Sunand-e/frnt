import QuestionTextEditor from './QuestionTextEditor';
import OptionContainer from './OptionContainer';
import { Answer, Question, useQuizStore } from '../useQuizStore';

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
        <div className='flex uppercase text-xs space-x-2 text-main opacity-80 mb-1'>
          <span>Correct?</span>
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