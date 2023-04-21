import useBlockEditor from '../../useBlockEditor';
import { produce } from 'immer'
import { getBlock } from '../../useBlockStore';
import QuestionEditor from '../../../../quiz/questions/QuestionEditor';

const QuestionBlockEdit = ({ block: b }) => {

  const block = getBlock(b.id)

  const { updateBlock } = useBlockEditor()

  const handleUpdateQuestion = (question) => {
    const updatedBlock = produce(block, draft => {
      draft.properties = question
    })
    
    updateBlock(updatedBlock)
  };

  return (
    <div className='p-8'>
      <QuestionEditor onUpdate={handleUpdateQuestion} question={block.properties} type='single' />
    </div>
  );
}

export default QuestionBlockEdit;