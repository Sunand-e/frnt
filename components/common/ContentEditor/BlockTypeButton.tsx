import { useDraggable } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import blocktypes from './blocktypes';
import { CSS } from '@dnd-kit/utilities';


type BlockTypeButtonProps = {
  onSelect?: (event: any) => void,
  type,
  className: string,
  isDisabled: false
}

const BlockTypeButton = ({
  onSelect, 
  type, 
  className, 
  isDisabled
} : BlockTypeButtonProps) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: type.name,
  });

  return (
    <button 
      onClick={() => onSelect(type)} 
      disabled={isDisabled} 
      className={`${isDisabled && 'text-gray-500 cursor-not-allowed'} ${className} w-full h-full`}
      ref={setNodeRef}
      // style={style}
      {...listeners}
      {...attributes}
    >
      <type.icon className="h-8" />
      <span>{type.text}</span>
    </button>
  )
}

export default BlockTypeButton
