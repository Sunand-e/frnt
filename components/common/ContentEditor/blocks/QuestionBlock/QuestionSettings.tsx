export const QuestionSettings = ({block}) => {

  return (
    <><pre>
    { JSON.stringify(block.properties.options.map(o => o.id),null,2) }
    </pre></>
  )
}

export default QuestionSettings