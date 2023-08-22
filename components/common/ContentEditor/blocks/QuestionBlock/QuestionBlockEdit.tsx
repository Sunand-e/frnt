import useBlockEditor from '../../useBlockEditor';
import { produce } from 'immer'
import { getBlock, useBlockStore } from '../../useBlockStore';
import QuestionEditor from '../../../../quiz/questions/QuestionEditor';

const QuestionBlockEdit = ({ block: b }) => {

  const block = getBlock(b.id)

  const { updateBlock } = useBlockStore()

  const handleUpdateQuestion = (question) => {

    const updatedBlock = produce(block, draft => {
      draft.properties = question
    })
    updateBlock(updatedBlock)
  };

  return (
    <div className='p-8 shadow-md bg-white'>
      <QuestionEditor onUpdate={handleUpdateQuestion} question={block.properties} />
    </div>
  );
}

export default QuestionBlockEdit;