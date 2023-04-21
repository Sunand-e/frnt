import { TrashAlt } from '@styled-icons/boxicons-regular';
import { useCallback, useMemo, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import OptionEditor from './OptionEditor'

const OptionContainer = ({option, questionType=null, editable=true, onChange, onRemove=null}) => {

  const contentRef = useRef(option.content)
    
  const handleChange = useCallback((content) => {
    onChange(option, content)
  },[onChange])

  return (
    <div key={option.id} className="flex items-center mb-2 hover:bg-main hover:bg-opacity-5">
      <div className="flex items-center space-x-4 group/option px-4">
        { questionType === 'multi' ? (
          <input type="checkbox" id={`option${option.id}`} name={`option${option.id}`} value={option.id} className="h-5 w-5 text-main focus:ring-main border-gray-300 rounded" />
        ) : (
          <input type="radio" id={`option${option.id}`} name="options" value={option.id} className="h-5 w-5 text-main focus:ring-main border-gray-300 rounded-full" />
        )}
        <OptionEditor
          id={option.id}
          content={contentRef.current} 
          onChange={handleChange}
        />
        { onRemove && (
          <button onClick={() => onRemove(option)} className="text-red-500 opacity-0 group-hover/option:opacity-100 hover:text-red-600">
            <TrashAlt size={20} />
          </button>
        )}
      </div>
    </div>
  )
}

OptionContainer.whyDidYouRender = true 

export default OptionContainer