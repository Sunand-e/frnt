import styles from '../TextBlock/styles.module.scss'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import MenuBar from '../TextBlock/MenuBar/MenuBar'
import { useEffect } from 'react'

const OptionEditor = ({id=null, editable=true, onChange, content=null}) => {

  const editor = useEditor({
    editable,
    editorProps: {
      attributes: {
        class: 'prose max-w-none dark:prose-invert prose-sm sm:prose-base lg:prose-md focus:outline-none',
      },
    },
    extensions: [ 
      StarterKit,
      Placeholder.configure({
        placeholder: ({ node }) => {
          return 'Enter answer here...'
        },
      })
    ],
    content
  })

  useEffect(() => {
    if(editor) {
      editor.off("update");
      editor.on("update", ({ editor: updatedEditor }) => onChange(updatedEditor.getJSON()));
    }
  }, [editor, onChange]);

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
      <EditorContent id={id} className="editor__content" editor={editor} />
    </div>
  )
}

OptionEditor.whyDidYouRender = true 

export default OptionEditor