import { useDraggable } from '@dnd-kit/core';
import { v4 as uuidv4 } from 'uuid';
import blocktypes, { BlockType } from './blocktypes';
import { CSS } from '@dnd-kit/utilities';
import { useRef, useState } from 'react';


type BlockTypeButtonProps = {
  onSelect?: (event: any) => void,
  type: BlockType,
  className: string,
  isDisabled: false
}

const BlockTypeButton = ({
  onSelect, 
  type, 
  className, 
  isDisabled
} : BlockTypeButtonProps) => {

  
  const id = useRef(uuidv4())
  
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: `tmp-${id.current}`,
    data: {
      type,
      fromSidebar: true
    }
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
