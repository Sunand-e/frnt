import { v4 as uuidv4 } from 'uuid';
import blocktypes from './blocktypes';

const BlockButton = ({onSelectBlock: selectBlock, type, text, Icon, isDisabled}) => {

  const handleClick = () => {
    const newBlock = {
      type: type,
      id: uuidv4(),
      properties: {}
    }
    selectBlock(newBlock)
  }

  return (
    <button onClick={handleClick} disabled={isDisabled}  className={`${isDisabled && 'text-gray-500 cursor-not-allowed'} flex items-center space-x-2 p-2 text-center bg-white rounded-lg shadow shadow-lg`}>
      <Icon className="h-10" />
      <span>{text}</span>
    </button>
  )
}

export default BlockButton
