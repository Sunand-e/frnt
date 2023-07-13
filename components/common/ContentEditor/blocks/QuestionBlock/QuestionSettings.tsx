import produce from "immer";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { QuestionFormValues } from "../../../../quiz/questions/QuestionSettings";
import ReactSelectInput from "../../../inputs/ReactSelectInput"
import TextAreaInput from "../../../inputs/TextAreaInput";
import useBlockEditor from "../../useBlockEditor";

export const QuestionSettings = ({block}) => {

  const { register, watch, control } = useForm<QuestionFormValues>({defaultValues: {
    settings: block.properties.settings,
    questionType: block.properties.questionType,
  }});

  const watchFeedbackType = watch("settings.feedback.type")
  const {updateBlock} = useBlockEditor()

  useEffect(() => {
    const subscription = watch((data) => {
      const newBlock = produce(block, draft => {
        draft.properties.questionType = data.questionType,
        draft.properties.settings = data.settings
      })
      updateBlock(newBlock)
    })
    return () => subscription.unsubscribe()

  },[watch, block.properties])

  return (
    <form className='h-full w-full max-w-sm flex flex-col space-y-3 pt-2 px-1 text-sm'>
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