import SelectInput from "../../../inputs/SelectInput"

export const QuestionSettings = ({block}) => {

  return (
    <>
    <SelectInput
      label="Question type"
      options={[
        {
          label: 'Single choice',
          value: 'single'
        },
        {
          label: 'Multiple choice',
          value: 'multi'
        }
      ]}
    />
    <pre>

    {/* { JSON.stringify(block.properties.answers.map(o => o.id),null,2) } */}
    </pre></>
  )
}

export default QuestionSettings