import { produce } from 'immer';
import QuestionEditor from '../../../../quiz/questions/QuestionEditor';
import { getBlock, useBlockStore } from '../../useBlockStore';

const QuestionBlockEdit = ({ block: b }) => {

  const block = getBlock(b.id)

  const { updateBlock } = useBlockStore(state => state.updateBlock)

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