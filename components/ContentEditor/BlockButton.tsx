import { v4 as uuidv4 } from 'uuid';
import BlockTypes from './BlockTypes';

const BlockButton = ({onAddBlock: addBlock, type, text, Icon}) => {

  const handleClick = () => {
    const newBlock = {
      type: type,
      id: uuidv4(),
      properties: BlockTypes.find(t => t.name === type).defaultProperties
    }
    addBlock(newBlock)
  }

  return (
    <button onClick={handleClick} className="flex items-center space-x-2 p-2 text-center bg-white rounded-lg shadow shadow-lg">
      <Icon className="h-10" />
      <span>{text}</span>
    </button>
  )
}

export default BlockButton