import { mergeAttributes, Node } from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'
import Component from './TestNode'

export default Node.create({
  // configuration …
  name: 'reactComponent',

  group: 'block',

  atom: true,

  draggable: true,

  addAttributes() {
    return {
      count: {
        default: 0,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'react-component',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['react-component', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component)
  },
})