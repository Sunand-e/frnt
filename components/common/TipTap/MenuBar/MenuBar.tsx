import styles from './MenuBar.module.scss'
import React, { Fragment } from 'react'
import MenuItem from './MenuItem'
import FontSizeDropdown from '../../ContentEditor/blocks/common/FontSizeDropdown'
import Select, { components, ContainerProps } from 'react-select';
import { FontSize } from '@styled-icons/boxicons-regular/FontSize'
import remixiconUrl from './remixicon.symbol.svg'
const fontSizes = [
  10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52
]

const lineHeights = [
  0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8
]

const lineHeightOptions = lineHeights.map(size => ({
  value: size, label: size
}))

const fontSizeOptions = fontSizes.map(size => ({
  value: size,
  label: `${size}px`
}))

const FontSizeControl = ({ children, ...props }) => (
  <components.Control {...props}>
    <svg className="remix w-5 h-6 ml-1 fill-main-secondary">
      <use xlinkHref={`${remixiconUrl}#ri-font-size`} />
    </svg>
    {children}
  </components.Control>
);

const LineHeightControl = ({ children, ...props }) => (
  <components.Control {...props}>
    <svg className="remix w-5 h-6 ml-1 fill-main-secondary">
      <use xlinkHref={`${remixiconUrl}#ri-line-height`} />
    </svg>
    {children}
  </components.Control>
);

const FontSizeSelect = ({onChange}) => (
  <Select 
    className='mr-1 text-main-secondary'
    components={{ Control: FontSizeControl }}
    isSearchable={false}
    options={fontSizeOptions}
    onChange={onChange}
  />
)

const LineHeightSelect = ({onChange}) => (
  <Select 
    className='mx-1 text-main-secondary'
    components={{ Control: LineHeightControl }}
    options={lineHeightOptions}
    isSearchable={false}
    onChange={onChange}

  />
)

export default ({ editor }) => {

  const changeFontSize = option => {
    editor.chain().focus().setFontSize(option.value+'px').run()
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
      icon: 'strikethrough',
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      type: 'divider',
    },
    {
      icon: 'h-1',
      title: 'Heading 1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      icon: 'h-2',
      title: 'Heading 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      icon: 'paragraph',
      title: 'Paragraph',
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive('paragraph'),
    },
    {
      type: 'font-size'
    },
    {
      type: 'line-height'
    },
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
    {
      icon: 'list-check-2',
      title: 'Task List',
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: () => editor.isActive('taskList'),
    },
    {
      icon: 'code-box-line',
      title: 'Code Block',
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
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
    {
      icon: 'text-wrap',
      title: 'Hard Break',
      action: () => editor.chain().focus().setHardBreak().run(),
    },
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

  return (
    <div className="editor__header">
      {items.map((item, index) => (
        <Fragment key={index}>
          { item.type === 'divider' ? (
            <div className={styles.divider} />
          ) : item.type === 'font-size' ? (
              <FontSizeSelect onChange={changeFontSize} />
          ) : item.type === 'line-height' ? (
              <LineHeightSelect onChange={changeLineHeight} />
          ) : item.type === 'color' ? (
            <input
              type="color"
              className='w-7 ml-2'
              onInput={event => editor.chain().focus().setColor(event.target.value).run()}
              value={editor.getAttributes('textStyle').color}
            />
          ) : (
              <MenuItem {...item} />
          )}
        </Fragment>
      ))}
    </div>
  )
}