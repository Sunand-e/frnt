import { NodeViewWrapper } from '@tiptap/react'
import { useState } from "react"

const TestNode = ({updateAttributes, node}) => {
  const [count, setCount] = useState(0)

  const increase = () => {
    updateAttributes({
      count: node.attrs.count + 1,
    })
  }
  return (
    <NodeViewWrapper className="react-component">
      <button onClick={() => setCount(count => count+1)}>increase</button>
    <p data-drag-handle>
      Testing TipTap Node Views in React: {count}
    </p>
    </NodeViewWrapper>
  )
}

export default TestNode