import { produce } from 'immer'
import { v4 as uuidv4 } from 'uuid';
import { useDebouncedCallback } from 'use-debounce';
import { Answer, useQuizStore } from '../useQuizStore';
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import QuestionContainer from './QuestionContainer';

const QuestionEditor = ({ question, onUpdate }) => {

  const [ mounted, setMounted ] = useState(false)

  useLayoutEffect(() => {
    useQuizStore.setState({
      isEditMode: true
    })
    setMounted(true)

    return () => {
      useQuizStore.setState({
        isEditMode: false
      })
    }
  },[question.id])

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
    if(question.questionType === 'single') {
      if(value === true) {
        onUpdate(produce(question, draft => {
          draft.answers = draft.answers.map(o => (
            o.id === option.id ? { ...o, correct: true } : { ...o, correct: false }
          ))
        }))
      }
    } else {
      onUpdate(produce(question, draft => {
        draft.answers = draft.answers.map(o => (
          o.id === option.id ? { ...o, correct: value } : o
        ))
      }))
    }
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

  return mounted && (
    <>
      <QuestionContainer
        question={question}
        onAddOption={handleAddOption}
        onOptionChange={handleOptionChange}
        onOptionSelect={handleOptionSelect}
        onQuestionChange={handleQuestionChange}
        onRemoveOption={handleRemoveOption}
      />
    </>
  );
}

export default QuestionEditor;