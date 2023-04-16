import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TrashAlt } from '@styled-icons/boxicons-regular';
import useBlockEditor from '../../useBlockEditor';
import { produce } from 'immer'
import QuestionTextEditor from './QuestionTextEditor';
import OptionEditor from './OptionEditor';
import { v4 as uuidv4 } from 'uuid';
import { getBlock } from '../../useBlockStore';
import OptionContainer from './OptionContainer';
import { useDebouncedCallback } from 'use-debounce';
/* FOR TS...
{
  type: 'question',
  properties: {
    questionType: ''
    questionText: ''
    answers: [
      {
        text: ''
        correct: true/false
      }
    ],
  }
}
*/

const QuestionEditor = ({ question, type, onUpdate }) => {

  const handleQuestionChange = useDebouncedCallback((content) => {
    onUpdate(produce(question, draft => {
      draft.question.content = content
    }))
  }, 300);

  const handleOptionChange = useDebouncedCallback((option, content) => {
    onUpdate(produce(question, draft => {
      draft.options = draft.options.map(o => (
        o.id === option.id ? { ...o, content } : o
      ))
    }))
  })
    
  const handleAddOption = () => {
    onUpdate(produce(question, draft => {
      draft.options.push({
        id: uuidv4(),
        content: '',
      })
    }))
  };

  const handleRemoveOption = (option) => {
    onUpdate(produce(question, draft => {
      draft.properties.options = draft.properties.options.filter(
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
        {question.options.map((option, index) => (
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