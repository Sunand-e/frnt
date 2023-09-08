import { useState } from 'react'
import { useController } from 'react-hook-form'
import classNames from '../../../utils/classNames';
import Editor from './Editor'

const TipTapInput = ({
  name,
  control,
  placeholder,
  label = null,
  editorClasses = '',
  editable = true,
  onUpdate = null,
  content: initialContent = null,
}) => {

  const { field } = useController({
    control,
    name
  });

  // const [content, setContent] = useState(initialContent);

  const handleUpdate = content => {
    field.onChange(content || null)
    // setContent(content)
    onUpdate && onUpdate(content)
  }

  return (
    <label className={`block z-40`}>
      { label && <span className="text-sm font-medium text-gray-700">{ label }</span> }
      <Editor
        editorClass={classNames(
          editorClasses,
          'bg-white px-3 p-1.5 block rounded-md border border-1',
          'shadow-sm border-gray-300 hover:border-gray-400/60',
          'hover:border-gray-400/60 focus:border-main focus:ring focus:ring-main/50',
        )}
        content={initialContent}
        editable={editable}
        onUpdate={handleUpdate}
        autofocus={false}
        placeholder={placeholder}
      />
    </label>
  )
}

export default TipTapInput