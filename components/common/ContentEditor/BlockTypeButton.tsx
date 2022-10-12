import { v4 as uuidv4 } from 'uuid';
import blocktypes from './blocktypes';

const BlockTypeButton = ({onSelect, type, isDisabled}) => {
  
  return (
    <button onClick={() => onSelect(type)} disabled={isDisabled} className={`${isDisabled && 'text-gray-500 cursor-not-allowed'} flex items-center space-x-2 p-2 text-center bg-white rounded-lg shadow shadow-lg`}>
      <type.icon className="h-10" />
      <span>{type.text}</span>
    </button>
  )
}

export default BlockTypeButton
