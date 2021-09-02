import { FormatAlignCenter, FormatAlignJustify, FormatAlignLeft, FormatAlignRight } from '@styled-icons/material-rounded'
import { 
  createAlignPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createHeadingPlugin,
  createHistoryPlugin,
  createItalicPlugin,
  createParagraphPlugin,
  createPlateComponents,
  createPlateOptions,
  createReactPlugin,
  createStrikethroughPlugin,
  createUnderlinePlugin,
  ELEMENT_ALIGN_CENTER,
  ELEMENT_ALIGN_JUSTIFY,
  ELEMENT_ALIGN_RIGHT,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_PARAGRAPH,
  getPlatePluginType,
  HeadingToolbar,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
  Plate,
  ToolbarAlign,
  useEventEditorId,
  useStoreEditorRef
} from '@udecode/plate'
import { useState } from 'react'
import { string } from 'yup/lib/locale'

const pluginsBasic = [
  // editor
  createReactPlugin(),
  createHistoryPlugin(),

  // elements
  createParagraphPlugin(),
  createBlockquotePlugin(),
  createCodeBlockPlugin(),
  createHeadingPlugin(),
  
  // marks
  createBoldPlugin(),
  createItalicPlugin(),
  createUnderlinePlugin(),
  createStrikethroughPlugin(),
  createCodePlugin(),
]

export const createElement = (
  text = '',
  {
    type = ELEMENT_PARAGRAPH,
    mark,
  }: {
    type?: string
    mark?: string
  } = {}
) => {
  const leaf = { text }
  if(mark) {
    leaf[mark] = true
  }
  return {
    type,
    children: [leaf]
  }
}

const initialValueBasicElements = [
  createElement('🧱 Elements', { type: ELEMENT_H1 }),
  createElement('🔥 Basic Elements', { type: ELEMENT_H1 }),
  createElement('These are the most common elemtns, known as \'blocks\':'),
  createElement('Heading 1', { type: ELEMENT_H1 }),
  createElement('Heading 2', { type: ELEMENT_H2 }),
  createElement('Heading 3', { type: ELEMENT_H3 }),
  createElement('Heading 4', { type: ELEMENT_H4 }),
  createElement('Heading 5', { type: ELEMENT_H5 }),
  createElement('Heading 6', { type: ELEMENT_H6 }),
  createElement('Blockquote', { type: ELEMENT_BLOCKQUOTE }),
  {
    type: ELEMENT_CODE_BLOCK,
    children: [
      {
        type: ELEMENT_CODE_LINE,
        children: [
          {
            text: "const a = 'Hello';"
          }
        ]
      },
      {
        type: ELEMENT_CODE_LINE,
        children: [
          {
            text: "const b = 'World';"
          }
        ]
      }
    ]
  },
  createElement('💅 Marks', { type: ELEMENT_H1 }),
  createElement('💧 Basic Marks', { type: ELEMENT_H2 }),
  createElement(
    'The basic marks consist of text formatting such as bold, italic, underline, strikethrough, subscript, superscript, and code.'
  ),
  createElement(
    'You can customize the type, the component and the hotkey for each of these.'
  ),
  createElement('This text is bold.', { mark: MARK_BOLD }),
  createElement('This text is italic.', { mark: MARK_ITALIC }),
  createElement('This text is underlined.', {
    mark: MARK_UNDERLINE,
  }),
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: 'This text is bold, italic and underlined.',
        [MARK_BOLD]: true,
        [MARK_ITALIC]: true,
        [MARK_UNDERLINE]: true,
      },
    ],
  },
  createElement('This is a strikethrough text.', {
    mark: MARK_STRIKETHROUGH,
  }),
  createElement('This is an inline code.', { mark: MARK_CODE }),
]

const ToolbarButtonsAlign = () => {
  const editor = useStoreEditorRef();

  return (
    <>
      <ToolbarAlign icon={<FormatAlignLeft />} />
      <ToolbarAlign
        type={getPlatePluginType(editor, ELEMENT_ALIGN_CENTER)}
        icon={<FormatAlignCenter />}
      />
      <ToolbarAlign
        type={getPlatePluginType(editor, ELEMENT_ALIGN_RIGHT)}
        icon={<FormatAlignRight />}
      />
      <ToolbarAlign
        type={getPlatePluginType(editor, ELEMENT_ALIGN_JUSTIFY)}
        icon={<FormatAlignJustify />}
      />
    </>
  );
};

const ContentEditor = () => {

  const editableProps = {
    placeholder: 'Type something here...',
    style: {
      padding: '15px'
    }
  }

  const plugins = [
    ...pluginsBasic,
    createAlignPlugin()
  ];

  const components = createPlateComponents();
  const options = createPlateOptions();

  const [debugValue, setDebugValue] = useState(null);

  const handleChange = (newValue) => {
    setDebugValue(newValue)
  }
  
  return (
    <>
      <HeadingToolbar className="">
        <ToolbarButtonsAlign />
      </HeadingToolbar>
      <Plate
        editableProps={editableProps}
        initialValue={initialValueBasicElements}
        onChange={handleChange}
        plugins={plugins}
        components={components}
        options={options}
      />
      <pre>
        { JSON.stringify(debugValue, null, 2)}
      </pre>
    </>
  )
}

export default ContentEditor