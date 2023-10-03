import styles from '../../../styles/TipTap.module.scss'
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react'
import { Node } from "@tiptap/core";
import StarterKit from '@tiptap/starter-kit'
import MenuBar from '../TipTap/MenuBar/MenuBar'
import Placeholder from '@tiptap/extension-placeholder'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import TextAlign from '@tiptap/extension-text-align'
import FontFamily from '@tiptap/extension-font-family'
import Underline from '@tiptap/extension-underline'
import { FontSize } from '../ContentEditor/tiptap/extensions/font-size'
import { LineHeight } from '../ContentEditor/tiptap/extensions/line-height'
import { useEffect, useRef, useState } from 'react'
import classNames from '../../../utils/classNames';

const OneLiner = Node.create({
  name: "oneLiner",
  topNode: true,
  content: "block",
});

const Editor = ({
  autofocus=false,
  editable=true,
  onUpdate=(instance) => null,
  onMenuHidden=null,
  onMenuShow=null,
  isHeading=false,
  content=null,
  editorClass='p-1',
  defaultAlignment='left',
  placeholder='Enter text here...'
}) => {

  const editor = useEditor({
    editable,
    autofocus,
    editorProps: {
      attributes: {
        class: classNames(
          editorClass,
          isHeading ? 'prose-lg lg:prose-xl prose-p:text-[1.9rem]' : 'prose-sm lg:prose-md',
          'rounded-md prose max-w-none dark:prose-invert sm:prose-base focus:outline-none',
        ),
      },
    },
    extensions: [
      ...(isHeading ? [OneLiner] : []), 
      StarterKit.configure({
        ...(isHeading && { document: false }),
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Enter a heading.....'
          }

          return placeholder
        },
      }),
      TextStyle,
      FontFamily.configure({
        types: ['textStyle'],
      }),
      Underline,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        defaultAlignment
      }),
      FontSize.configure({
        types: ['textStyle'],
      }),
      LineHeight.configure({
        types: ['heading', 'paragraph'],
      })
    ],
    content
  })

  useEffect(() => {
    if(editor) {
      editor.off("update");
      editor.on("update", ({ editor: updatedEditor }) => onUpdate(updatedEditor.getJSON()));
    }
  }, [editor, onUpdate]);

  return (
    <div className={styles.editor}>
      { editor && (
        <BubbleMenu editor={editor} tippyOptions={{ 
          duration: 100,
          interactive: true,
          placement: 'bottom',
          maxWidth: 'none',
          theme: "memberhub-white",
          ...(!!onMenuShow && {onShow: onMenuShow}),
          ...(!!onMenuHidden && {onHidden: onMenuHidden}),
        }}>
        <MenuBar editor={editor} isHeading={isHeading} />
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

export default Editor