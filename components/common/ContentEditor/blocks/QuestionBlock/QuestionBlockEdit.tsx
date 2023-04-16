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
    <QuestionEditor onUpdate={handleUpdateQuestion} question={block.properties} type='simple' />
  );
}

export default QuestionBlockEdit;