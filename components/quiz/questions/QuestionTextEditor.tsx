import styles from '../../../styles/TipTap.module.scss'
import { EditorContent, useEditor } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Placeholder from '@tiptap/extension-placeholder'
import Text from '@tiptap/extension-text'
import { useEffect } from 'react'
import { useQuizStore } from '../useQuizStore'

const CustomDocument = Document.extend({
  content: 'heading block*',
})
const QuestionTextEditor = ({editable=true, onChange=null, content=null}) => {

  const isEditMode = useQuizStore(state => state.isEditMode)

  const editor = useEditor({
    editable: isEditMode,
    extensions: [
      CustomDocument,
      // Document,
      // Paragraph,
      Text,
      Heading.configure({
        levels: [3],
        HTMLAttributes: {
          class: 'my-custom-class',
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Enter question text...'
          }
        },
      }),
    ],
    editorProps: {
      attributes: {
        class: 'rounded-md prose max-w-none dark:prose-invert prose-sm sm:prose-base lg:prose-md focus:outline-none text-main',
      },
    },
    content: content
  })

  useEffect(() => {
    if(editor && onChange) {
      editor.off("update");
      editor.on("update", ({ editor: updatedEditor }) => onChange(updatedEditor.getJSON()));
    }
  }, [editor, onChange]);

  return (
    <div className={`w-full ${styles.editor}`}>
      <EditorContent className="editor__content" editor={editor} />
    </div>
  )
}

export default QuestionTextEditor