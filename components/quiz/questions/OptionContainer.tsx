import { TrashAlt } from '@styled-icons/boxicons-regular/TrashAlt';
import { useCallback, useMemo, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useQuizStore } from '../useQuizStore';
import OptionEditor from './OptionEditor'

const ConditionalLabelWrapper = ({ isEditMode, children }) => (
  isEditMode ? children : <label className="w-full flex items-center space-x-3">{children}</label>
)

const OptionContainer = ({option, questionType=null, onChange, onSelectedChange, onRemove=null}) => {

  const contentRef = useRef(option.content)
  const isEditMode = useQuizStore(state => state.isEditMode)

  const handleChange = useCallback((content) => {
    onChange && onChange(option, content)
  },[onChange])

  return (
    <div key={option.id} className="w-full flex items-center mb-2 hover:bg-main hover:bg-opacity-5">
      <div className="w-full flex items-center space-x-4 group/option px-4">
        <ConditionalLabelWrapper isEditMode={isEditMode}>
          { questionType === 'multi' ? (
            <input type="checkbox" checked={isEditMode && option.correct} onChange={onSelectedChange} id={`option${option.id}`} name={`option${option.id}`} value={option.id} className="h-5 w-5 text-main focus:ring-main border-gray-300 rounded" />
          ) : (
            <input type="radio" onChange={onSelectedChange} id={`option${option.id}`} name="options" value={option.id} className="h-5 w-5 text-main focus:ring-main border-gray-300 rounded-full" />
          )}          
          <OptionEditor
            id={option.id}
            content={contentRef.current} 
            onChange={handleChange}
          />
        </ConditionalLabelWrapper>
        { isEditMode && onRemove && (
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