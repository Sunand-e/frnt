import ReactSelectInput from "../../common/inputs/ReactSelectInput"
import { useQuizStore } from "../useQuizStore"
import { useForm } from 'react-hook-form';
import TextAreaInput from "../../common/inputs/TextAreaInput";
import { useEffect } from "react";
export interface QuestionFormValues {
  questionType: string
  settings: {
    feedback?: {
      type?: string
      single?: string
      correct?: string
      incorrect?: string
    }
  }
}

export const QuestionSettings = ({idd}) => {

  const question = useQuizStore(state => state.computed.activeQuestion())
  const { register, watch, control } = useForm<QuestionFormValues>({defaultValues: question});
  const watchFeedbackType = watch("settings.feedback.type")

  useEffect(() => {
    const subscription = watch((data) => {

      useQuizStore.setState(({questions}) => {
        return ({
          isDirty: true,
          questions: questions.map(q => q.id === question.id ? ({
            ...q,
            questionType: data.questionType,
            settings: {
              ...question.settings,
              ...data.settings
            }
          }) : q)
        })
      })
    })
    return () => subscription.unsubscribe()

  },[watch, question])

  return (
    <form className='h-full w-full max-w-sm flex flex-col space-y-4 pt-2 px-1 text-sm'>
      <ReactSelectInput
        control={control}
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
      <ReactSelectInput
        control={control}
        // onChange={handleChangeType}
        name={'settings.feedback.type'}
        label="Feedback type"
        options={[
          {
            label: 'Single',
            value: 'single'
          },
          {
            label: 'Correct/Incorrect',
            value: 'multi'
          }
        ]}
      />
      { watchFeedbackType === 'multi' ? (
        <>
          <TextAreaInput
            label="Correct Feedback"
            inputAttrs={register("settings.feedback.correct", {
            })}
          />
          <TextAreaInput
            label="Incorrect Feedback"
            inputAttrs={register("settings.feedback.incorrect", {
            })}
          />
        </>
      ) : (
        <TextAreaInput
          label="Feedback"
          inputAttrs={register("settings.feedback.single", {
          })}
        />
      )}
    </form>
  )
}

export default QuestionSettings