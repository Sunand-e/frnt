import { useState } from 'react'
import { useController } from 'react-hook-form'
import Editor from './Editor'

const TipTapInput = ({
  name,
  control,
  label = null,
  editable = true,
  onUpdate = null,
  content: initialContent = null,
}) => {

  const { field } = useController({
    control,
    name
  });

  const [content, setContent] = useState(initialContent);

  const handleUpdate = content => {
    field.onChange(content || null)
    setContent(content)
    onUpdate && onUpdate(content)
  }

  return (
    <label className={`block z-40`}>
      { label && <span className="text-sm font-medium text-gray-700">{ label }</span> }
      <Editor
        editorClass='mx-1 bg-white px-3 p-1.5 block rounded-md border-gray-300 hover:border-gray-400/60 shadow-sm focus:border-main focus:ring focus:ring-main/50'
        content={content}
        editable={editable}
        onUpdate={handleUpdate}
      />
    </label>
  )
}

export default TipTapInput