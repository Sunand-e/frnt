import QuestionTextEditor from './QuestionTextEditor';
import OptionContainer from './OptionContainer';
import { Answer, Question } from '../useQuizStore';

type QuestionProps = {
  question: Question
  handleQuestionChange?: (content: JSON) => void
  handleOptionChange?: (option: Answer, content: JSON) => void
  handleRemoveOption?: (option: Answer) => void
  handleAddOption?: () => void
  editable?: boolean
}
const QuestionContainer = ({
  question,
  editable=false,
  handleQuestionChange,
  handleOptionChange,
  handleRemoveOption,
  handleAddOption
 }: QuestionProps) => {
  
  return (
    <div className="p-12 bg-white rounded-lg shadow-md w-full">
      <div className="flex items-center space-x-4 mb-2">
        <QuestionTextEditor key={question.id} content={question.content} onChange={handleQuestionChange} />
      </div>
      {question.answers.map((option, index) => (
        <OptionContainer
          editable={editable}
          key={option.id}
          option={option}
          questionType={question.questionType}
          onChange={handleOptionChange}
          onRemove={handleRemoveOption}
        />
      ))}
      
      { editable && (
        <button onClick={handleAddOption} className="text-main hover:font-bold ml-4 mt-2">
          + Add answer
        </button>
      )}
    </div>
  );
}

export default QuestionContainer