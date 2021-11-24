import 'tippy.js/animations/scale.css'
import 'tippy.js/dist/tippy.css'
import React from 'react'
import { TippyProps } from '@tippyjs/react'
import {
  addColumn,
  addRow,
  BalloonToolbar,
  deleteColumn,
  deleteRow,
  deleteTable,
  ELEMENT_ALIGN_CENTER,
  ELEMENT_ALIGN_JUSTIFY,
  ELEMENT_ALIGN_RIGHT,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_OL,
  ELEMENT_UL,
  insertTable,
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_KBD,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE,
  AlignToolbarButton,
  CodeBlockToolbarButton,
  BlockToolbarButton,
  ListToolbarButton,
  MarkToolbarButton,
  TableToolbarButton,
  LinkToolbarButton,
  ImageToolbarButton,
  usePlateEditorRef,
  usePlateEventId,
  getPlatePluginType,
  MARK_HIGHLIGHT,
  MARK_COLOR,
  MARK_BG_COLOR,
  ToolbarColorPicker,
} from '@udecode/plate'
import { CodeAlt } from '@styled-icons/boxicons-regular/CodeAlt'
import { CodeBlock } from '@styled-icons/boxicons-regular/CodeBlock'
import { Subscript } from '@styled-icons/material-rounded/Subscript'
import { Superscript } from '@styled-icons/material-rounded/Superscript'
import { BorderAll } from '@styled-icons/material-rounded/BorderAll'
import { BorderBottom } from '@styled-icons/material-rounded/BorderBottom'
import { BorderClear } from '@styled-icons/material-rounded/BorderClear'
import { Highlight } from '@styled-icons/material-rounded/Highlight'
import { BorderLeft } from '@styled-icons/material-rounded/BorderLeft'
import { BorderRight } from '@styled-icons/material-rounded/BorderRight'
import { BorderTop } from '@styled-icons/material-rounded/BorderTop'
import { FormatAlignCenter } from '@styled-icons/material-rounded/FormatAlignCenter'
import { FormatAlignJustify } from '@styled-icons/material-rounded/FormatAlignJustify'
import { FormatAlignLeft } from '@styled-icons/material-rounded/FormatAlignLeft'
import { FormatAlignRight } from '@styled-icons/material-rounded/FormatAlignRight'
import { FormatBold } from '@styled-icons/material-rounded/FormatBold'
import { FormatItalic } from '@styled-icons/material-rounded/FormatItalic'
import { FormatListBulleted } from '@styled-icons/material-rounded/FormatListBulleted'
import { FormatListNumbered } from '@styled-icons/material-rounded/FormatListNumbered'
import { FormatQuote } from '@styled-icons/material-rounded/FormatQuote'
import { FormatStrikethrough } from '@styled-icons/material-rounded/FormatStrikethrough'
import { FormatUnderlined } from '@styled-icons/material-rounded/FormatUnderlined'
import { Keyboard } from '@styled-icons/material-rounded/Keyboard'
import { Looks3 } from '@styled-icons/material-rounded/Looks3'
import { Looks4 } from '@styled-icons/material-rounded/Looks4'
import { Looks5 } from '@styled-icons/material-rounded/Looks5'
import { Looks6 } from '@styled-icons/material-rounded/Looks6'
import { LooksOne } from '@styled-icons/material-rounded/LooksOne'
import { LooksTwo } from '@styled-icons/material-rounded/LooksTwo'
import { Image } from '@styled-icons/material-rounded/Image'
import { Link } from '@styled-icons/material-rounded/Link'
import { FormatColorText } from '@styled-icons/material-rounded/FormatColorText'
import { FontDownload } from '@styled-icons/material-rounded/FontDownload'

export const ToolbarButtonsBasicElements = () => {
  const editor = usePlateEditorRef(usePlateEventId('focus'))

  return (
    <>
      <BlockToolbarButton
        type={getPlatePluginType(editor, ELEMENT_H1)}
        icon={<LooksOne />}
      />
      <BlockToolbarButton
        type={getPlatePluginType(editor, ELEMENT_H2)}
        icon={<LooksTwo />}
      />
      <BlockToolbarButton
        type={getPlatePluginType(editor, ELEMENT_H3)}
        icon={<Looks3 />}
      />
      <BlockToolbarButton
        type={getPlatePluginType(editor, ELEMENT_H4)}
        icon={<Looks4 />}
      />
      <BlockToolbarButton
        type={getPlatePluginType(editor, ELEMENT_H5)}
        icon={<Looks5 />}
      />
      <BlockToolbarButton
        type={getPlatePluginType(editor, ELEMENT_H6)}
        icon={<Looks6 />}
      />
      <BlockToolbarButton
        type={getPlatePluginType(editor, ELEMENT_BLOCKQUOTE)}
        icon={<FormatQuote />}
      />
      <CodeBlockToolbarButton
        type={getPlatePluginType(editor, ELEMENT_CODE_BLOCK)}
        icon={<CodeBlock />}
      />
    </>
  )
}

export const ToolbarButtonsList = () => {
  const editor = usePlateEditorRef(usePlateEventId('focus'))

  return (
    <>
      <ListToolbarButton
        type={getPlatePluginType(editor, ELEMENT_UL)}
        icon={<FormatListBulleted />}
      />
      <ListToolbarButton
        type={getPlatePluginType(editor, ELEMENT_OL)}
        icon={<FormatListNumbered />}
      />
    </>
  )
}

export const ToolbarButtonsAlign = () => {
  const editor = usePlateEditorRef(usePlateEventId('focus'))

  return (
    <>
      <AlignToolbarButton icon={<FormatAlignLeft />} />
      <AlignToolbarButton
        type={getPlatePluginType(editor, ELEMENT_ALIGN_CENTER)}
        icon={<FormatAlignCenter />}
      />
      <AlignToolbarButton
        type={getPlatePluginType(editor, ELEMENT_ALIGN_RIGHT)}
        icon={<FormatAlignRight />}
      />
      <AlignToolbarButton
        type={getPlatePluginType(editor, ELEMENT_ALIGN_JUSTIFY)}
        icon={<FormatAlignJustify />}
      />
    </>
  )
}

export const ToolbarButtonsBasicMarks = () => {
  const editor = usePlateEditorRef(usePlateEventId('focus'))

  return (
    <>
      <MarkToolbarButton
        type={getPlatePluginType(editor, MARK_BOLD)}
        icon={<FormatBold />}
      />
      <MarkToolbarButton
        type={getPlatePluginType(editor, MARK_ITALIC)}
        icon={<FormatItalic />}
      />
      <MarkToolbarButton
        type={getPlatePluginType(editor, MARK_UNDERLINE)}
        icon={<FormatUnderlined />}
      />
      <MarkToolbarButton
        type={getPlatePluginType(editor, MARK_STRIKETHROUGH)}
        icon={<FormatStrikethrough />}
      />
      <MarkToolbarButton
        type={getPlatePluginType(editor, MARK_CODE)}
        icon={<CodeAlt />}
      />
      <MarkToolbarButton
        type={getPlatePluginType(editor, MARK_SUPERSCRIPT)}
        clear={getPlatePluginType(editor, MARK_SUBSCRIPT)}
        icon={<Superscript />}
      />
      <MarkToolbarButton
        type={getPlatePluginType(editor, MARK_SUBSCRIPT)}
        clear={getPlatePluginType(editor, MARK_SUPERSCRIPT)}
        icon={<Subscript />}
      />
    </>
  )
}

export const ToolbarKbd = () => {
  const editor = usePlateEditorRef(usePlateEventId('focus'))

  return (
    <MarkToolbarButton
      type={getPlatePluginType(editor, MARK_KBD)}
      icon={<Keyboard />}
    />
  )
}

export const ToolbarHighlight = () => {
  const editor = usePlateEditorRef(usePlateEventId('focus'))

  return (
    <MarkToolbarButton
      type={getPlatePluginType(editor, MARK_HIGHLIGHT)}
      icon={<Highlight />}
    />
  )
}

export const ToolbarButtonsTable = () => (
  <>
    <TableToolbarButton icon={<BorderAll />} transform={insertTable} />
    <TableToolbarButton icon={<BorderClear />} transform={deleteTable} />
    <TableToolbarButton icon={<BorderBottom />} transform={addRow} />
    <TableToolbarButton icon={<BorderTop />} transform={deleteRow} />
    <TableToolbarButton icon={<BorderLeft />} transform={addColumn} />
    <TableToolbarButton icon={<BorderRight />} transform={deleteColumn} />
  </>
)

export const BallonMarkToolbarButtons = () => {
  const editor = usePlateEditorRef(usePlateEventId('focus'))

  const arrow = false
  const theme = 'dark'
  const direction = 'top'
  const hiddenDelay = 0
  const tooltip: TippyProps = {
    arrow: true,
    delay: 0,
    duration: [200, 0],
    hideOnClick: false,
    offset: [0, 17],
    placement: 'top',
  }

  return (
    <BalloonToolbar
      direction={direction}
      hiddenDelay={hiddenDelay}
      theme={theme}
      arrow={arrow}
    >
      <MarkToolbarButton
        type={getPlatePluginType(editor, MARK_BOLD)}
        icon={<FormatBold />}
        tooltip={{ content: 'Bold (⌘B)', ...tooltip }}
      />
      <MarkToolbarButton
        type={getPlatePluginType(editor, MARK_ITALIC)}
        icon={<FormatItalic />}
        tooltip={{ content: 'Italic (⌘I)', ...tooltip }}
      />
      <MarkToolbarButton
        type={getPlatePluginType(editor, MARK_UNDERLINE)}
        icon={<FormatUnderlined />}
        tooltip={{ content: 'Underline (⌘U)', ...tooltip }}
      />
    </BalloonToolbar>
  )
}

export const ToolbarButtons = () => (
  <>
    <ToolbarButtonsBasicElements />
    <ToolbarButtonsList />
    <ToolbarButtonsBasicMarks />
    <ToolbarColorPicker pluginKey={MARK_COLOR} icon={<FormatColorText />} />
    <ToolbarColorPicker pluginKey={MARK_BG_COLOR} icon={<FontDownload />} />
    <ToolbarButtonsAlign />
    <LinkToolbarButton icon={<Link />} />
    <ImageToolbarButton icon={<Image />} />
    <ToolbarButtonsTable />
  </>
)
