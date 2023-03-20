import './styles.scss'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import MenuBar from './MenuBar/MenuBar'

export default () => {

  const editor = useEditor({
    extensions: [ StarterKit ],
  })

  return (
    <div className="editor">
      {editor && <MenuBar editor={editor} />}
      <EditorContent className="editor__content" editor={editor} />
    </div>
  )
}