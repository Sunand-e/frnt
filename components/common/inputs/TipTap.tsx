// src/TipTap.jsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const TipTap = ({value='', containerClass='', onUpdate=null}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World!</p>',
    onUpdate
  })

  return (
    <div className={containerClass}>
      <EditorContent editor={editor} value={value} className={`h-full`} />
    </div>
  )
}

export default TipTap