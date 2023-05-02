import { produce } from 'immer'
import { v4 as uuidv4 } from 'uuid';
import { useDebouncedCallback } from 'use-debounce';
import { Answer, useQuizStore } from '../useQuizStore';
import { useCallback, useEffect, useMemo } from 'react';
import QuestionContainer from './QuestionContainer';

const QuestionEditor = ({ question, onUpdate }) => {

  useEffect(() => {
    useQuizStore.setState({
      isEditMode: true
    })
    return () => {
      useQuizStore.setState({
        isEditMode: false
      })
    }
  },[])

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
  
  const handleOptionSelect = (option, value) => {
    onUpdate(produce(question, draft => {
      draft.answers = draft.answers.map(o => (
        o.id === option.id ? { ...o, correct: value } : o
      ))
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
      editMode={true}
      handleAddOption={handleAddOption}
      handleOptionChange={handleOptionChange}
      handleOptionSelect={handleOptionSelect}
      handleQuestionChange={handleQuestionChange}
      handleRemoveOption={handleRemoveOption}
    />
  );
}

export default QuestionEditor;