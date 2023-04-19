import SelectInput from "../../common/inputs/SelectInput"
import { useQuizStore } from "../useQuizStore"

export const QuestionSettings = () => {
const activeQuestion = useQuizStore(state => state.activeQuestion)
  return (
    <>
      <SelectInput
        label="Question type"
        options={[]}
      />
      <pre>
        { JSON.stringify(activeQuestion,null,2) }
      </pre>
    </>
  )
}

export default QuestionSettings