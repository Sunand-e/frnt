import styles from '../../../styles/TipTap.module.scss'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import MenuBar from '../../common/TipTap/MenuBar/MenuBar'
import Placeholder from '@tiptap/extension-placeholder'
import { useQuizStore } from '../useQuizStore'

const OptionEditor = ({id=null, onChange, content=null}) => {

  const isEditMode = useQuizStore(state => state.isEditMode)

  const editor = useEditor({
    editable: isEditMode,
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'rounded-md prose max-w-none dark:prose-invert prose-sm sm:prose-base lg:prose-md focus:outline-none',
      },
    },
    extensions: [ 
      StarterKit,
      Placeholder.configure({
        placeholder: ({ node }) => {
          return 'Enter answer text...'
        },
      })
    ],
    content
  },[])

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