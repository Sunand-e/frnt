import { useFragment } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { QuizFragment } from "../../../../graphql/queries/allQueries";
import useUserHasCapability from "../../../../hooks/users/useUserHasCapability";
import { useRouter } from "../../../../utils/router";
import { useQuizStore } from "../../../quiz/useQuizStore";
import CheckboxInput from "../../inputs/CheckboxInput";
import RadioButtonsInput from "../../inputs/RadioButtonsInput";
import TextInput from "../../inputs/TextInput";
import FileDropzone from "../../FileDropzone";
import { v4 as uuidv4 } from "uuid";
import { AICreateQuizForm } from "../../../quiz/AICreateQuizForm";
import { SwitchInput } from "../../inputs/SwitchInput";

interface QuizFormValues {
  settings: {
    feedback?: string
    passMark?: number
    questionCount?: number
    hasCertificate?: boolean
    limitQuestions?: boolean
    attemptLimit?: number,
    limitAttempts?: boolean,
  }
}

export const QuizSettingsPanel = () => {

  const { userHasCapability } = useUserHasCapability()
  const router = useRouter()
  const { id, cid: contentId } = router.query
  
  const { complete, data: quiz, missing } = useFragment({
    fragment: QuizFragment,
    fragmentName: 'QuizFragment',
    from: { id: contentId, __typename: "ContentItem", },
  });
  
  const questions = useQuizStore(state => state.questions)
  const settings = useQuizStore(state => state.settings)
  const { register, watch, control } = useForm<QuizFormValues>({defaultValues: {
    ...quiz,
    settings: {
      passMark: 80,
      limitQuestions: false,
      attemptLimit: 3,
      limitAttempts: false,
      questionCount: questions.length || 10,
      feedback: 'afterQuestion',
      ...quiz.settings,
      ...settings
    }
  }});

  useEffect(() => {
    const subscription = watch((data) => {
      useQuizStore.setState({
        isDirty: true,
        settings: data.settings
      })
    })
    return () => subscription.unsubscribe()
  },[watch])

  const limitQuestions = watch('settings.limitQuestions')
  const limitAttempts = watch('settings.limitAttempts')

  const addQuestionsFromSimpleJSON = (json) => {
    const newQuestions = json.map(question => ({
      id: uuidv4(),
      questionType: "single",
      settings: {},
      content: {
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: {
              level: 1
            },
            content: [
              {
                type: "text",
                text: question.questionText
              }
            ]
          }
        ]
      },
      answers: question.answers.map(answer => ({
        id: uuidv4(),
        content: {
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: answer.answerText
                }
              ]
            }
          ]
        },
        correct: answer.correct
      }))
    }))

    useQuizStore.setState(state => ({
      questions: [ ...state.questions, ...newQuestions],
      isDirty: true
    }))
  }
  
  const handleDropQuestionsJsonFile = async ([file]) => {
    var reader = new FileReader();
    reader.onload = function(e) {
      var contents = e.target.result;
      const json = JSON.parse(contents as string)
      addQuestionsFromSimpleJSON(json)
    };
    reader.readAsText(file);
  }

  const handleResponse = (data) => {
    // console.log('handleResponse (body)')
    const questionsJson = JSON.parse(data.response)
    addQuestionsFromSimpleJSON(questionsJson)
  }

  return (
    <div className="pt-3 p-1 flex-col space-y-3">
      <TextInput
        label="Pass mark (%)"
        type="number"
        inputAttrs={{
          ...register("settings.passMark", {
            valueAsNumber: true
          }),
          min: 0,
          max: 100
        }}
      />
      { !!questions.length && (
        <>
          <SwitchInput
            name={'settings.limitQuestions'}
            control={control}
            label={'Limit number of questions'}
          />
          { limitQuestions && (
            <TextInput
              label="Number of questions to show"
              type="number"
              inputAttrs={{
                ...register("settings.questionCount", {
                  valueAsNumber: true
                }),
                min: 1,
                max: questions.length
              }}
            />
          )}
        </>
      )}
      <SwitchInput
        name={'settings.limitAttempts'}
        control={control}
        label={'Limit number of attempts'}
      />
      { limitAttempts && (
        <TextInput
          label="Max. number of attempts:"
          type="number"
          inputAttrs={{
            ...register("settings.attemptLimit", {
              valueAsNumber: true
            }),
            min: 1
          }}
        />
      )}
      {/* <SwitchInput
        name={'settings.randomiseQuestions'}
        control={control}
        label={'Randomise order of questions'}
      /> */}
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