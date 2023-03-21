import { v4 as uuidv4 } from 'uuid';
import blocktypes from './blocktypes';

const BlockTypeButton = ({onSelect, type, className, isDisabled}) => {
  
  return (
    <button onClick={() => onSelect(type)} disabled={isDisabled} className={`${isDisabled && 'text-gray-500 cursor-not-allowed'} ${className}`}>
      <type.icon className="h-8" />
      <span>{type.text}</span>
    </button>
  )
}

export default BlockTypeButton
