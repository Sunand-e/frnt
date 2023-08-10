import styles from './MenuBar.module.scss'
import React, { Fragment, useState } from 'react'
import MenuItem from './MenuItem'
import FontSizeDropdown from '../../ContentEditor/blocks/common/FontSizeDropdown'
import Select, { components, ContainerProps } from 'react-select';
import { FontSize } from '@styled-icons/boxicons-regular/FontSize'
import remixiconUrl from './remixicon.symbol.svg'
import {TextFont} from '@styled-icons/fluentui-system-filled/TextFont'
import useLazyFontLoad from '../../../../hooks/useLazyFontLoad';

const googleFonts = [
  { name: 'Be Vietnam' },
  { name: 'Cormorant' },
  { name: 'DM Sans' },
  { name: 'Inter' },
  { name: 'Lato' },
  { name: 'Lora' },
  { name: 'Lustria' },
  { name: 'Maitree' },
  { name: 'Maven Pro' },
  { name: 'Merriweather' },
  { name: 'Montserrat' },
  { name: 'Open Sans' },
  { name: 'Oswald' },
  { name: 'Poppins' },
  { name: 'Raleway' },
  { name: 'Roboto' },
  { name: 'Roboto Slab' },
];

const lineHeights = [
  0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5
  // "100%", "115%", "150%", "200%", "250%", "300%"
]
const FontFamilyOptions = googleFonts.map(font => ({
  value: font.name, label: font.name
}))

const lineHeightOptions = lineHeights.map(size => ({
  value: size, label: size
}))

const FontSizeControl = ({ children, ...props }) => (
  <components.Control {...props}>
    <svg className="remix w-5 h-6 ml-1 fill-main-secondary">
      <use xlinkHref={`${remixiconUrl}#ri-font-size`} />
    </svg>
    {children}
  </components.Control>
);

const FontFamilyControl = ({ children, ...props }) => (
  <components.Control {...props}>
    <TextFont className="remix w-5 h-6 ml-1 fill-main-secondary" />
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

  
const defaultFontSizes = [
  10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52
]

const headingFontSizes = [
  20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72
]

const FontSizeSelect = ({value, onChange, isHeading}) => {

  const sizes = isHeading ? headingFontSizes : defaultFontSizes

  const fontSizeOptions = sizes.map(size => ({
    value: `${size}px`,
    label: `${size}px`
  }))

  return (
    <Select 
      value={value}
      className='mr-1 text-main-secondary'
      components={{ Control: FontSizeControl }}
      // isSearchable={false}
      options={fontSizeOptions}
      onChange={onChange}
    />
  )
}

const FontFamilySelect = ({value, onChange}) => {

  useLazyFontLoad({font: `${value.value}`})

  return (
    <Select 
      value={value}
      className='mx-1 text-main-secondary'
      components={{ Control: FontFamilyControl }}
      options={FontFamilyOptions}
      isSearchable={false}
      onChange={onChange}
    />
  )
}

const LineHeightSelect = ({value, onChange}) => {
  return (
    <Select 
      value={value}
      className='mx-1 text-main-secondary'
      components={{ Control: LineHeightControl }}
      options={lineHeightOptions}
      isSearchable={false}
      onChange={onChange}
    />
  )
}

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
      icon: 'strikethrough',
      title: 'Strike',
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
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
    {
      type: 'font-family'
    },
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

  let fontFamily = editor.getAttributes('textStyle').fontFamily
  if(fontFamily) {
    if(fontFamily.charAt(0) === "'" && fontFamily.charAt(fontFamily.length-1) === "'") {
      fontFamily = fontFamily.substring(1, fontFamily.length-1);
    }
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
            <FontFamilySelect value={{ 
              value: fontFamily,
              label: fontFamily
            }} onChange={setFontFamily} />
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