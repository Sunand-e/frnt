import { UPDATE_QUESTION } from "../../graphql/mutations/question/UPDATE_QUESTION"
import { QuestionFragment } from "../../graphql/queries/allQueries"
import { QuestionFragmentFragment } from "../../graphql/generated";
import { useMutation } from "@apollo/client"
import cache from "../../graphql/cache"

function useUpdateQuestion(id = null) {

  const [updateQuestionMutation, updateQuestionResponse] = useMutation(
    UPDATE_QUESTION
  );

  const updateQuestion = async values => {
  // const updateQuestion = ({title=null, contentBlocks=null}) => {
    const cachedQuestion = cache.readFragment<QuestionFragmentFragment>({
      id:`Question:${id}`,
      fragment: QuestionFragment,
      fragmentName: 'QuestionFragment',
    })

    await updateQuestionMutation({
      variables: {
        id,
        ...values,
      },
      optimisticResponse: {
        updateQuestion: {
          __typename: 'UpdateQuestionPayload',
          question: {
            ...cachedQuestion,
            ...values
          },
        }
      }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    updateQuestion,
  }
}

export default useUpdateQuestion