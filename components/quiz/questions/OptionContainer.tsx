
import { useCallback, useMemo, useRef } from 'react';
import {Trash} from '@styled-icons/heroicons-outline/Trash'
import Editor from '../../common/inputs/Editor';
import { useQuizStore } from '../useQuizStore';
import OptionEditor from './OptionEditor'

const ConditionalLabelWrapper = ({ isEditMode, children }) => (
  isEditMode ? children : <label className="w-full flex items-center space-x-3">{children}</label>
)

const OptionContainer = ({option, disabled=false, question=null, onChange, onSelectedChange, selected, onRemove=null}) => {

  const contentRef = useRef(option.content)
  const isEditMode = useQuizStore(state => state.isEditMode)
  const isOnlyAnswer = question.answers.length === 1

  const handleChange = useCallback((content) => {
    if(onChange) onChange(option, content)
  },[onChange])

  return (
    <div key={option.id} className="w-full flex items-center py-1 hover:bg-main hover:bg-opacity-5">
      <div className="w-full flex items-center space-x-4 group/option px-4">
        <ConditionalLabelWrapper isEditMode={isEditMode}>
          { question.questionType === 'multi' ? (
            <input type="checkbox" checked={selected} disabled={disabled} onChange={onSelectedChange} id={`option${option.id}`} name={`option${option.id}`} value={option.id} className="h-5 w-5 text-main focus:ring-main border-gray-300 rounded" />
          ) : (
            <input type="radio" checked={selected} disabled={disabled} onChange={onSelectedChange} id={`option${option.id}`} name={`options-${question.id}`} value={option.id} className="h-5 w-5 text-main focus:ring-main border-gray-300 rounded-full" />
          )}          
          <Editor
            content={contentRef.current} 
            onUpdate={handleChange}
            placeholder='Enter answer text...'
            editable={isEditMode}
          />
        </ConditionalLabelWrapper>
        { isEditMode && !isOnlyAnswer && onRemove && (
          <button onClick={() => onRemove(option)}
            className="opacity-0 group-hover/option:opacity-100 hover:text-red-600">
            <Trash
              className={`w-5 text-red-800`}
              
            />
          </button>
        )}
      </div>
    </div>
  )
}

OptionContainer.whyDidYouRender = true 

export default OptionContainer