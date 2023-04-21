import ReactSelectInput from "../../common/inputs/ReactSelectInput"
import { useQuizStore } from "../useQuizStore"
import { useForm } from 'react-hook-form';
import produce from "immer";

interface QuestionFormValues {
  questionType: string
}

export const QuestionSettings = () => {

  const question = useQuizStore(state => state.computed.activeQuestion())

  const defaultValues = {
    ...question
  }

  const { register, watch, handleSubmit, control, setFocus, getValues, setValue, formState } = useForm<QuestionFormValues>({defaultValues});
  
  const handleChangeType = (type) => {
    useQuizStore.setState(({questions}) => ({
      questions: questions.map(q => q.id === question.id ? ({
        ...question,
        questionType: type.value
      }) : q)
    }))
    setValue("questionType", type.value)
  }

  return (
    <form className='h-full w-full max-w-sm flex flex-col space-y-4 pt-2 text-sm'>
      <ReactSelectInput
        control={control}
        onChange={handleChangeType}
        name={'questionType'}
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
    </form>
  )
}

export default QuestionSettings