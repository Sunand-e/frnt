import useBlockEditor from '../../useBlockEditor';
import { produce } from 'immer'
import { getBlock } from '../../useBlockStore';
import QuestionContainer from '../../../../quiz/questions/QuestionContainer';
import { useState } from 'react';
import FeedbackContainer from '../../../../quiz/questions/FeedbackContainer';
import xor from 'lodash/xor';
import Button from '../../../Button';

const QuestionBlock = ({ block: b }) => {

  const block = getBlock(b.id)
  const [attemptOptionIds, setAttemptOptionIds] = useState([])

  const [status, setStatus] = useState('unanswered')

  const submitAnswer = () => {
    const correctAnswerIds = block.properties.answers.filter(a => a.correct).map(a => a.id)
    const isCorrect = xor(correctAnswerIds, attemptOptionIds).length === 0
    setStatus(isCorrect ? 'correct' : 'incorrect')
  }

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
      { status === 'unanswered' ? (
        <Button className="mt-2 ml-4" onClick={submitAnswer}>Submit</Button>
      ) : block.properties.settings?.feedback !== 'off' && (
        <FeedbackContainer status={status} question={block.properties}>
          <></>
        </FeedbackContainer>
      )}
    </div>
  );
}

export default QuestionBlock;