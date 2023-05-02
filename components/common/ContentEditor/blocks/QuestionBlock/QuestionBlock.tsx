import useBlockEditor from '../../useBlockEditor';
import { produce } from 'immer'
import { getBlock } from '../../useBlockStore';
import QuestionContainer from '../../../../quiz/questions/QuestionContainer';

const QuestionBlock = ({ block: b }) => {

  const block = getBlock(b.id)
  
  return (
    <div className='p-8'>
      <QuestionContainer question={block.properties} />
    </div>
  );
}

export default QuestionBlock;