import { produce } from 'immer'
import QuestionTextEditor from './QuestionTextEditor';
import OptionContainer from './OptionContainer';
import { v4 as uuidv4 } from 'uuid';
import { useDebouncedCallback } from 'use-debounce';

const QuestionEditor = ({ question, type, onUpdate }) => {
  
  const handleQuestionChange = useDebouncedCallback((content) => {
    onUpdate(produce(question, draft => {
      draft.question = {
        ...draft.question,
        content
      }
    }))
  }, 300);

  const handleOptionChange = useDebouncedCallback((option, content) => {
    onUpdate(produce(question, draft => {
      draft.answers = draft.answers.map(o => (
        o.id === option.id ? { ...o, content } : o
      ))
    }))
  }, 300);
    
  const handleAddOption = () => {
    onUpdate(produce(question, draft => {
      draft.answers.push({
        id: uuidv4(),
        content: '',
      })
    }))
  };

  const handleRemoveOption = (option) => {
    onUpdate(produce(question, draft => {
      draft.answers = draft.answers.filter(
        o => o.id !== option.id
      )
    }))
  };
  return (
    // <div className="p-4 bg-white rounded-lg shadow-md">
    <div className="p-4">
        <div className="flex items-center space-x-4 mb-2">
          <QuestionTextEditor content={question.content} onChange={handleQuestionChange} />
        </div>
        {question.answers.map((option, index) => (
          <OptionContainer
            key={option.id}
            option={option}
            questionType={type}
            onChange={handleOptionChange}
            onRemove={handleRemoveOption}
          />
        ))}
      <button onClick={handleAddOption} className="text-main hover:font-bold">
        + Add answer
      </button>
    </div>
  );
}

export default QuestionEditor;