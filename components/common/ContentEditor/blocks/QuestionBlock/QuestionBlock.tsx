import useBlockEditor from '../../useBlockEditor';
import { produce } from 'immer'
import { getBlock } from '../../useBlockStore';
import QuestionContainer from '../../../../quiz/questions/QuestionContainer';
import { useState } from 'react';

const QuestionBlock = ({ block: b }) => {

  const block = getBlock(b.id)
  const [attemptOptionIds, setAttemptOptionIds] = useState([])

  const handleOptionSelect = (option, value) => {

    if(block.properties.questionType === 'multi') {
      setAttemptOptionIds(value ? (
        attemptOptionIds.includes(option.id) ? attemptOptionIds : [...attemptOptionIds, option.id]
      ) : (
        attemptOptionIds.filter(id => id !== option.id)
      ))
    } else {
      setAttemptOptionIds([option.id])
    }
  }

  return (
    <div className='p-8'>
      <QuestionContainer 
        onOptionSelect={handleOptionSelect}
        selectedOptionIds={attemptOptionIds}
        question={block.properties}
      />
    </div>
  );
}

export default QuestionBlock;