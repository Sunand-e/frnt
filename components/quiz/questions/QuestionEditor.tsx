import { produce } from 'immer'
import { v4 as uuidv4 } from 'uuid';
import { useDebouncedCallback } from 'use-debounce';
import { Answer, useQuizStore } from '../useQuizStore';
import { useMemo } from 'react';
import QuestionContainer from './QuestionContainer';

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

  const handleNewOptionChange = (id: string, content: JSON) => {
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

  const handleRemoveOption = (option: Answer) => {
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
    <QuestionContainer
      question={question}
      handleAddOption={handleAddOption}
      handleOptionChange={handleOptionChange}
      handleQuestionChange={handleQuestionChange}
      handleRemoveOption={handleRemoveOption}
    />
  );
}

export default QuestionEditor;