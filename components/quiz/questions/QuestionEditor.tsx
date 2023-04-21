import { produce } from 'immer'
import QuestionTextEditor from './QuestionTextEditor';
import OptionContainer from './OptionContainer';
import { v4 as uuidv4 } from 'uuid';
import { useDebouncedCallback } from 'use-debounce';
import { useQuizStore } from '../useQuizStore';
import { useMemo } from 'react';
import Button from '../../common/Button';

const QuestionEditor = ({ question, onUpdate }) => {
  
  const handleQuestionChange = useDebouncedCallback((content) => {
    onUpdate({...question, content})
  }, 300);

  const handleOptionChange = useDebouncedCallback((option, content) => {
    onUpdate(produce(question, draft => {
      draft.answers = draft.answers.map(o => (
        o.id === option.id ? { ...o, content } : o
      ))
    }))
  }, 300);

  const handleNewOptionChange = (id, content) => {
    onUpdate(produce(question, draft => {
      draft.answers.push({id, content})
    }))
  }
    
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
  
  const activeQuestion = useQuizStore(state => state.computed.activeQuestion())
  const newOption = useMemo(() => ({
    id: uuidv4(),
    content: ''
  }),[question.answers.length])
  
  return (
    <div className="p-12 bg-white rounded-lg shadow-md w-full">
      <div className="flex items-center space-x-4 mb-2">
        <QuestionTextEditor key={question.id} content={question.content} onChange={handleQuestionChange} />
      </div>
      {question.answers.map((option, index) => (
        <OptionContainer
          key={option.id}
          option={option}
          questionType={question.questionType}
          onChange={handleOptionChange}
          onRemove={handleRemoveOption}
        />
      ))}
      <button onClick={handleAddOption} className="text-main hover:font-bold ml-4 mt-2">
        + Add answer
      </button>
    </div>
  );
}

export default QuestionEditor;