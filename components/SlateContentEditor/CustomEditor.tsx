import { Editor, Text, Transforms } from "slate"

// Define our own custom set of helpers.
const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      // universal: true,
    })
    return !!match
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code'
    })
    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      // Apply it to text nodes, and split the text node up if the
      // selection is overlapping only part of it.
      { match: n => Text.isText(n), split: true },
    )
  },

  toggleCodeBlock(editor) {
    // Determine whether any of the currently selected blocks are code blocks.
    const isActive = CustomEditor.isCodeBlockActive(editor)
    // set the currently selected blocks' type to "code".
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    )
  }
}

export default CustomEditor