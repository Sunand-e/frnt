const CodeElement = ({attributes, children}) => (
  <pre {...attributes}>
    <code>{children}</code>
  </pre>
)

export default CodeElement