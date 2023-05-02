import { UpdateQuiz, UpdateQuizVariables } from "../../graphql/mutations/quiz/__generated__/UpdateQuiz";
import { UPDATE_QUIZ } from "../../graphql/mutations/quiz/UPDATE_QUIZ"
import { ContentFragment, GET_QUIZ } from "../../graphql/queries/allQueries"
import { ContentFragment as ContentFragmentType } from '../../graphql/queries/__generated__/ContentFragment';
import { useMutation, useQuery, useReactiveVar } from "@apollo/client"
import cache from "../../graphql/cache"

function useUpdateQuiz() {

  const [updateQuizMutation, updateQuizResponse] = useMutation<UpdateQuiz, UpdateQuizVariables>(
    UPDATE_QUIZ
  );

  const updateQuiz = id => async values => {
  // const updateQuiz = ({title=null, contentBlocks=null}) => {
    const cachedQuiz = cache.readFragment<ContentFragmentType>({
      id:`ContentItem:${id}`,
      fragment: ContentFragment,
      fragmentName: 'ContentFragment',
    })
    const questions = values.questions.map(q => ({
      ...q, contentItemId: id
    }))
    await updateQuizMutation({
      variables: {
        id,
        ...values,
        questions
      },
      // optimisticResponse: {
      //   updateQuiz: {
      //     __typename: 'UpdateQuizPayload',
      //     quiz: {
      //       ...cachedQuiz,
      //       ...values
      //     },
      //   }
      // }
    }).catch(res => {
      // TODO: do something if there is an error!!
    })
  }

  return {
    updateQuiz,
  }
}

export default useUpdateQuiz