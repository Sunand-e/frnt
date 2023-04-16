import styles from '../../../../../styles/TipTap.module.scss'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from '../../../TipTap/MenuBar/MenuBar'
import Placeholder from '@tiptap/extension-placeholder'

export default ({editable=true, onUpdate=null, content=null}) => {

  const editor = useEditor({
    editable,
    editorProps: {
      attributes: {
        class: 'prose max-w-none dark:prose-invert prose-sm sm:prose-base lg:prose-md m-5 focus:outline-none',
      },
    },
    extensions: [ 
      StarterKit,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Enter a heading.....'
          }

          return 'Enter text here...'
        },
      })
    ],
    ...( !!onUpdate && {
      onUpdate: ({editor}) => {
        onUpdate(editor.getJSON())
      }
    }),
    content
  })

  return (
    <div className={styles.editor}>
      { editor && (
        <BubbleMenu editor={editor} tippyOptions={{ 
          duration: 100,
          maxWidth: 'none',
          theme: "memberhub-white",
        }}>
        <MenuBar editor={editor} />
        </BubbleMenu>
      )}
      {/* <AnimatePresence>
        { isEditable && editor && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <MenuBar editor={editor} />
          </motion.div>
        )}
      </AnimatePresence> */}
      <EditorContent className="editor__content" editor={editor} />
    </div>
  )
}