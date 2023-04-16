import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TrashAlt } from '@styled-icons/boxicons-regular';
import useBlockEditor from '../../useBlockEditor';
import { produce } from 'immer'
import QuestionTextEditor from './QuestionTextEditor';
import OptionEditor from './OptionEditor';
import { v4 as uuidv4 } from 'uuid';
import { getBlock } from '../../useBlockStore';
import OptionContainer from './OptionContainer';
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


const QuestionBlockEdit = ({ block: b }) => {

  const block = getBlock(b.id)

  const  { properties } = block
  const { updateBlock, debouncedUpdateBlock } = useBlockEditor()

  const handleQuestionChange = (content) => {
    const updatedBlock = produce(block, draft => {
      draft.properties.question.content = content
    })

    debouncedUpdateBlock(updatedBlock)
  };

  const handleOptionChange = useCallback((option, content) => {

    const options = block.properties.options.map(o => (
      o.id === option.id ? { ...o, content } : o
    ))
    
    const updatedBlock = produce(block, draft => {
      draft.properties.options = options
    })

    debouncedUpdateBlock(updatedBlock)

  },[block, block.properties.options.length]);
  
  const handleAddOption = () => {
    const updatedBlock = produce(block, draft => {
      draft.properties.options.push({
        id: uuidv4(),
        content: '',
      })
    })
    updateBlock(updatedBlock)
  };

  const handleRemoveOption = (option) => {
    const updatedBlock = produce(block, draft => {
      draft.properties.options = draft.properties.options.filter(
        o => o.id !== option.id
      )
    })
    updateBlock(updatedBlock)
  };

  return (
    // <div className="p-4 bg-white rounded-lg shadow-md">
    <div className="p-4">
        <div className="flex items-center space-x-4 mb-2">
          <QuestionTextEditor content={properties.question?.content} onChange={handleQuestionChange} />
        </div>
        {block.properties.options.map((option, index) => (
          <OptionContainer
            key={option.id}
            option={option}
            questionType={properties.questionType}
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

export default QuestionBlockEdit;