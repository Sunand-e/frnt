import {
  ELEMENT_IMAGE,
  ELEMENT_PARAGRAPH,
  createPlateComponents,
  createPlateOptions,
  HeadingToolbar,
  MentionCombobox,
  PlatePlugin,
  Plate,
  ToolbarSearchHighlight,
  createAlignPlugin,
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createHighlightPlugin,
  createHistoryPlugin,
  createKbdPlugin,
  createImagePlugin,
  createItalicPlugin,
  createLinkPlugin,
  createListPlugin,
  createMediaEmbedPlugin,
  createNodeIdPlugin,
  createParagraphPlugin,
  createReactPlugin,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  createDndPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createTablePlugin,
  createTodoListPlugin,
  createTrailingBlockPlugin,
  createUnderlinePlugin,
  createDeserializeHTMLPlugin,
  createComboboxPlugin,
  createMentionPlugin,
  useFindReplacePlugin,
  createIndentPlugin,
  SPEditor,
  MARK_COLOR,
  withStyledProps,
  StyledLeaf,
  MARK_BG_COLOR,
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
  createDeserializeMDPlugin,
  createDeserializeCSVPlugin,
  createDeserializeAstPlugin,
  createNormalizeTypesPlugin,
  createFontSizePlugin,
  createHorizontalRulePlugin,
} from '@udecode/plate'
import {
  createExcalidrawPlugin,
  ELEMENT_EXCALIDRAW,
  ExcalidrawElement,
} from '@udecode/plate-excalidraw'
// import { initialValuePlayground } from './config/initialValues'
import { BallonToolbarMarks, ToolbarButtons } from './config/Toolbars'
import { withStyledPlaceHolders } from './config/withStyledPlaceHolders'
import { withStyledDraggables } from './config/withStyledDraggables'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Search } from '@styled-icons/material-rounded/Search'
import { HistoryEditor } from 'slate-history'
import { ReactEditor } from 'slate-react'
import { MENTIONABLES } from './config/mentionables'
import { CONFIG } from './config/config-full'
import { VALUES } from './config/values/values'
import { useMemo } from 'react'
import { createMultiTextPlugin } from './multi-text-element/createMultiTextPlugin'
import { MultiTextElement } from './multi-text-element/components/MultiTextElement'

type TEditor = SPEditor & ReactEditor & HistoryEditor

const id = 'ContentEditor'

let components = createPlateComponents({
  [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
  [MARK_COLOR]: withStyledProps(StyledLeaf, {
    leafProps: {
      [MARK_COLOR]: ['color'],
    },
  }),
  [MARK_BG_COLOR]: withStyledProps(StyledLeaf, {
    leafProps: {
      [MARK_BG_COLOR]: ['backgroundColor'],
    },
  }),
  ['editable-void']: MultiTextElement,
  // customize your components by plugin key
})
components = withStyledPlaceHolders(components)
components = withStyledDraggables(components)

const options = createPlateOptions({
  // customize your options by plugin key
})

const ContentEditor = ({content, onChange}) => {
  console.log('content')
  console.log(content)
  const { setSearch, plugin: searchHighlightPlugin } = useFindReplacePlugin()

  const pluginsMemo: PlatePlugin<TEditor>[] = useMemo(() => {
    const plugins = [
      createReactPlugin(),
      createHistoryPlugin(),
      createParagraphPlugin(),
      createBlockquotePlugin(),
      createTodoListPlugin(),
      createHeadingPlugin(),
      createImagePlugin(),
      createHorizontalRulePlugin(),
      createLinkPlugin(),
      createListPlugin(),
      createTablePlugin(),
      createMediaEmbedPlugin(),
      createExcalidrawPlugin(),
      createCodeBlockPlugin(),
      createAlignPlugin(CONFIG.align),
      createBoldPlugin(),
      createCodePlugin(),
      createItalicPlugin(),
      createHighlightPlugin(),
      createUnderlinePlugin(),
      createStrikethroughPlugin(),
      createSubscriptPlugin(),
      createSuperscriptPlugin(),
      createFontColorPlugin(),
      createFontBackgroundColorPlugin(),
      createFontSizePlugin(),
      createKbdPlugin(),
      createNodeIdPlugin(),
      createDndPlugin(),
      createIndentPlugin(CONFIG.indent),
      createAutoformatPlugin(CONFIG.autoformat),
      createResetNodePlugin(CONFIG.resetBlockType),
      createSoftBreakPlugin(CONFIG.softBreak),
      createExitBreakPlugin(CONFIG.exitBreak),
      createNormalizeTypesPlugin(CONFIG.forceLayout),
      createTrailingBlockPlugin(CONFIG.trailingBlock),
      createSelectOnBackspacePlugin(CONFIG.selectOnBackspace),
      createComboboxPlugin(),
      createMentionPlugin(),
      searchHighlightPlugin,
      createMultiTextPlugin()
    ]

    plugins.push(
      ...[
        createDeserializeMDPlugin({ plugins }),
        createDeserializeCSVPlugin({ plugins }),
        createDeserializeHTMLPlugin({ plugins }),
        createDeserializeAstPlugin({ plugins }),
      ]
    )

    return plugins
  }, [searchHighlightPlugin])

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        onChange={onChange}
        id={id}
        plugins={pluginsMemo}
        components={components}
        options={options}
        editableProps={CONFIG.editableProps}
        // initialValue={content?.blocks}
        initialValue={VALUES.playground}
      >
        <ToolbarSearchHighlight icon={Search} setSearch={setSearch} />
        <HeadingToolbar>
          <ToolbarButtons />
        </HeadingToolbar>

        <BallonToolbarMarks />

        <MentionCombobox items={MENTIONABLES} />

      </Plate>
    </DndProvider>
  )
}

export default ContentEditor