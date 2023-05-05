import { useFragment_experimental, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { QuizFragment } from "../../graphql/queries/allQueries";
import { GET_LATEST_USER_QUIZ_ATTEMPT } from "../../graphql/queries/quizzes";
import useCreateUserQuizAttempt from "../../hooks/quizzes/useCreateUserQuizAttempt";
import { useRouter } from "../../utils/router";
import { useQuizStore } from "./useQuizStore"
import QuestionView from "./questions/QuestionView";

function QuizView() {

  const router = useRouter()
  const { cid: quizId } = router.query
  
  const {createUserQuizAttempt} = useCreateUserQuizAttempt()

  const { loading, data: attemptQueryData, error } = useQuery(
    GET_LATEST_USER_QUIZ_ATTEMPT,
    {
      variables: {
        contentItemId: quizId,
      }
    }
  );

  useEffect(() => {
    if(attemptQueryData && attemptQueryData.latestUserQuizAttempt === null) {
      createUserQuizAttempt({
        contentItemId: quizId,
      })
    }
  },[attemptQueryData, quizId])

  const { data: quiz } = useFragment_experimental({
    fragment: QuizFragment,
    fragmentName: 'QuizFragment',
    from: { id: quizId, __typename: "ContentItem", },
  });

  const activeQuestion = useQuizStore(state => state.computed.activeQuestion())

  useEffect(() => {
    useQuizStore.setState({
      questions: quiz.questions,
      activeQuestionId: quiz.questions[0]?.id,
      isEditMode: false
    })
  },[quiz.id])

  useEffect(() => {
    useQuizStore.setState({
      attemptOptionIds: []
    })
  },[activeQuestion])

  return (
    <div className="h-full w-full p-16">
      <div className="p-12 bg-white rounded-lg shadow-md w-full flex justify-center">
        { activeQuestion && attemptQueryData?.latestUserQuizAttempt && (
          <QuestionView />
        )}
      </div>
  </div>
  )
}

export default QuizView