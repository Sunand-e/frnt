import { Fragment } from 'react';
import FontFamilySelect from '../../inputs/FontFamilySelect';
import FontSizeSelect from './FontSizeSelect';
import LineHeightSelect from './LineHeightSelect';
import styles from './MenuBar.module.scss';
import MenuItem from './MenuItem';

export default ({ editor, isHeading=false }) => {

  const setFontFamily = option => {
    editor.commands.setFontFamily(`'${option.value}'`)
  }
  
  const changeFontSize = option => {
    editor.chain().focus().setFontSize(option.value).run()
  }
  
  const changeLineHeight = option => {
    editor.chain().focus().setLineHeight(option.value).run()
  }

  const items = [
    {
      icon: 'bold',
      title: 'Bold',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: 'italic',
      title: 'Italic',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: 'underline',
      title: 'Underline',
      action: () => editor.chain().focus().toggleUnderline().run(),
      isActive: () => editor.isActive('underline'),
    },
    // {
    //   icon: 'strikethrough',
    //   title: 'Strike',
    //   action: () => editor.chain().focus().toggleStrike().run(),
    //   isActive: () => editor.isActive('strike'),
    // },
    {
      type: 'divider',
    },
    // {
    //   icon: 'h-1',
    //   title: 'Heading 1',
    //   action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    //   isActive: () => editor.isActive('heading', { level: 1 }),
    // },
    // {
    //   icon: 'h-2',
    //   title: 'Heading 2',
    //   action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    //   isActive: () => editor.isActive('heading', { level: 2 }),
    // },
    // {
    //   icon: 'paragraph',
    //   title: 'Paragraph',
    //   action: () => editor.chain().focus().setParagraph().setMark("textStyle", { fontSize: null }).run(),
    //   isActive: () => editor.isActive('paragraph'),
    // },
    // {
    //   type: 'font-family'
    // },
    {
      type: 'font-size'
    },
    {
      type: 'line-height'
    },
    // {
    //   type: 'newline'
    // },
    {
      type: 'color'
    },
    {
      icon: 'list-unordered',
      title: 'Bullet List',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: 'list-ordered',
      title: 'Ordered List',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    // {
    //   icon: 'list-check-2',
    //   title: 'Task List',
    //   action: () => editor.chain().focus().toggleTaskList().run(),
    //   isActive: () => editor.isActive('taskList'),
    // },
    // {
    //   icon: 'code-box-line',
    //   title: 'Code Block',
    //   action: () => editor.chain().focus().toggleCodeBlock().run(),
    //   isActive: () => editor.isActive('codeBlock'),
    // },
    {
      type: 'divider',
    },
    {
      icon: 'align-left',
      title: 'Align Left',
      action: () => editor.chain().focus().setTextAlign('left').run(),
      isActive: () => editor.isActive({ textAlign: 'left' }),
    },
    {
      icon: 'align-center',
      title: 'Align Center',
      action: () => editor.chain().focus().setTextAlign('center').run(),
      isActive: () => editor.isActive({ textAlign: 'center' }),
    },
    {
      icon: 'align-right',
      title: 'Align Right',
      action: () => editor.chain().focus().setTextAlign('right').run(),
      isActive: () => editor.isActive({ textAlign: 'right' }),
    },
    // {
    //   icon: 'double-quotes-l',
    //   title: 'Blockquote',
    //   action: () => editor.chain().focus().toggleBlockquote().run(),
    //   isActive: () => editor.isActive('blockquote'),
    // },
    // {
    //   icon: 'separator',
    //   title: 'Horizontal Rule',
    //   action: () => editor.chain().focus().setHorizontalRule().run(),
    // },
    {
      type: 'divider',
    },
    // {
    //   icon: 'text-wrap',
    //   title: 'Hard Break',
    //   action: () => editor.chain().focus().setHardBreak().run(),
    // },
    {
      icon: 'format-clear',
      title: 'Clear Format',
      action: () => editor.chain().focus().clearNodes().unsetAllMarks()
        .run(),
    },
    {
      type: 'divider',
    },
    {
      icon: 'arrow-go-back-line',
      title: 'Undo',
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: 'arrow-go-forward-line',
      title: 'Redo',
      action: () => editor.chain().focus().redo().run(),
    },
  ]

  let fontFamily = editor.getAttributes('textStyle').fontFamily?.replace(/['"]+/g, '')
  let color = editor.getAttributes('textStyle').color

  if(fontFamily) {
    // console.log('fontFamily')
    // console.log(fontFamily)
    // if(fontFamily.charAt(0) === "'" && fontFamily.charAt(fontFamily.length-1) === "'") {
    //   fontFamily = fontFamily.substring(1, fontFamily.length-1);
    // }
  }
  
  return (
    <div className="editor__header">
      {items.map((item, index) => (
        <Fragment key={index}>
          { item.type === 'divider' ? (
            <div className={styles.divider} />
          ) : item.type === 'newline' ? (
            <div className="basis-full" />
          ) : item.type === 'font-size' ? (
            <FontSizeSelect
              value={{ 
                value: editor.getAttributes('textStyle').fontSize,
                label: editor.getAttributes('textStyle').fontSize
              }}
              onChange={changeFontSize}
              isHeading={isHeading}
            />
          ) : item.type === 'font-family' ? (
            <FontFamilySelect value={fontFamily} onChange={setFontFamily} />
          ) : item.type === 'line-height' ? (
            <LineHeightSelect value={{ 
              value: editor.getAttributes('paragraph').lineHeight,
              label: editor.getAttributes('paragraph').lineHeight
            }} onChange={changeLineHeight} />
          ) : item.type === 'color' ? (
            <input
              type="color"
              className='w-7 ml-2'
              onInput={event => editor.chain().focus().setColor(event.target.value).run()}
              value={editor.getAttributes('textStyle').color || '#333333'}
            />
          ) : (
              <MenuItem {...item} />
          )}
        </Fragment>
      ))}
    </div>
  )
}