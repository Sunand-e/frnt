import useBlockEditor from '../../useBlockEditor';
import { produce } from 'immer'
import { getBlock } from '../../useBlockStore';
import QuestionEditor from '../../../../quiz/questions/QuestionEditor';
import QuestionContainer from '../../../../quiz/questions/QuestionContainer';

const QuestionBlock = ({ block: b }) => {

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
      <QuestionContainer question={block.properties} />
    </div>
  );
}

export default QuestionBlock;