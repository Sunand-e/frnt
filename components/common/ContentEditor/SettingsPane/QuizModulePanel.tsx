import { useFragment_experimental } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { QuizFragment } from "../../../../graphql/queries/allQueries";
import { useRouter } from "../../../../utils/router";
import { useQuizStore } from "../../../quiz/useQuizStore";
import RadioButtonsInput from "../../inputs/RadioButtonsInput";
import TextInput from "../../inputs/TextInput";

interface QuizFormValues {
  settings: {
    feedback?: string
    passMark?: number
  }
}

export const QuizModulePanel = () => {

  const router = useRouter()
  const { id, cid: contentId } = router.query
  
  const { complete, data: quiz, missing } = useFragment_experimental({
    fragment: QuizFragment,
    fragmentName: 'QuizFragment',
    from: { id: contentId, __typename: "ContentItem", },
  });
  
  const { register, watch, control } = useForm<QuizFormValues>({defaultValues: quiz});

  useEffect(() => {
    const subscription = watch((data) => {
      useQuizStore.setState({
        isDirty: true,
        settings: data.settings
      })
    })
    return () => subscription.unsubscribe()

  },[watch])

  return (
    <div className="pt-3 p-1 flex-col space-y-3">
      <TextInput
        label="Pass mark (%)"
        type="number"
        inputAttrs={{
          ...register("settings.passMark"),
          min: 0,
          max: 100
        }}
      />
      <RadioButtonsInput
      label="Show feedback" 
      className="text-sm"
      inputAttrs={register("settings.feedback")}
      options={[
        {
        text: 'On',
        value: 'afterQuestion'
        },
        {
        text: 'Off',
        value: 'off'
        }
      ]}
       />
    </div>
  )
}