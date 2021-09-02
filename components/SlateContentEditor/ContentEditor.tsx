import { useCallback, useMemo, useState } from "react"
// Import the Slate editor factory.
import { BaseEditor, createEditor, Descendant, Editor, Node, Text, Transforms } from 'slate'
// Import the Slate components and React plugin.
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { HistoryEditor } from "slate-history"
import { useRef } from "react"
import LinkElement from "./elements/LinkElement"
import ParagraphElement from "./elements/ParagraphElement"
import CodeElement from "./elements/CodeElement"
import CustomEditor from "./CustomEditor"

type CustomElement = {
  type: 'paragraph'
  children: CustomText[]
}
type CustomText = { text: string; bold?: true }

// TODO: What's this for?
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor
    Element: CustomElement
    Text: CustomText
  }
}
const ContentEditor = () => {

  // Create a Slate editor object that won't change across renders.
  // const editor = useMemo(() => withReact(createEditor()), [])
  
  const editorRef = useRef<Editor>()
  if (!editorRef.current) editorRef.current = withReact(createEditor())
  const editor = editorRef.current

  const initialValue: CustomElement[] = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]
  const [value, setValue] = useState<Descendant[]>(
    JSON.parse(localStorage.getItem('slateContent')) || initialValue
  )
  
  const renderElement = (props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />
      case "link":
        return <LinkElement {...props} />
      default:
        return <ParagraphElement {...props} />
    }
  }

  const handleKeyDown=(e) => {
    switch(e.key) {
      case '&': {
        e.preventDefault()
        editor.insertText('and')
        break
      }
      case 'ArrowLeft': {
        e.preventDefault()
        Transforms.move(editor, {
          distance: 1,
          unit: 'word',
          reverse: true,
        })
        break
      }
    }
    
    // All of the remaining key presses use the ctrl-key
    if (e.ctrlKey) {
      switch(e.key) {
        case 'b': {
          e.preventDefault()
          CustomEditor.toggleBoldMark(editor)
          break;
        }
        case '`': {
          e.preventDefault()
          CustomEditor.toggleCodeBlock(editor)
          break;
        }
      }
    }
  }

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])
  
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={v => {
        setValue(v)
        const content = JSON.stringify(v)
        localStorage.setItem('slateContent', content)
      }}
    >
    <div>
      <button className="bg-main m-2"
        onMouseDown={event => {
          event.preventDefault()
          CustomEditor.toggleBoldMark(editor)
        }}
      >
        Bold
      </button>
      <button className="bg-main  m-2"
        onMouseDown={event => {
          event.preventDefault()
          CustomEditor.toggleCodeBlock(editor)
        }}
      >
        Code Block
      </button>
    </div>
  
    <Editable
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      onKeyDown={handleKeyDown}
    />
    <pre>
      { JSON.stringify(value, null, 4) }
    </pre>
  </Slate>
  )
}
// Define a React component to render leaves with bold text.
const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}
export default ContentEditor
