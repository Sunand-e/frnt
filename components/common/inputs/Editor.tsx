import styles from '../../../styles/TipTap.module.scss'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from '../TipTap/MenuBar/MenuBar'
import Placeholder from '@tiptap/extension-placeholder'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import { FontSize } from '../ContentEditor/extensions/font-size'
import { LineHeight } from '../ContentEditor/extensions/line-height'
import { useRef, useState } from 'react'

export default ({autofocus=true, editable=true, onUpdate=null, content=null, containerRef=null, editorClass=''}) => {

  const editor = useEditor({
    editable,
    autofocus,
    editorProps: {
      attributes: {
        class: `${editorClass} prose max-w-none dark:prose-invert prose-sm sm:prose-base lg:prose-md focus:outline-none`,
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
      }),
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      FontSize.configure({
        types: ['textStyle'],
      }),
      LineHeight.configure({
        types: ['heading", "paragraph'],
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
          onShow: (instance) => {
            console.log('show')
            containerRef.current.style.zIndex = 99999
          },
          onHidden: (instance) => {
            containerRef.current.style.zIndex = containerRef.zIndex
          }
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