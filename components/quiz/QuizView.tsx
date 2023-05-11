import { useFragment_experimental, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { QuizFragment } from "../../graphql/queries/allQueries";
import useCreateUserQuizAttempt from "../../hooks/quizzes/useCreateUserQuizAttempt";
import { useRouter } from "../../utils/router";
import { useQuizStore } from "./useQuizStore"
import QuestionView from "./questions/QuestionView";
import QuizProgress from "./QuizProgress";
import useGetLatestQuizAttempt from "../../hooks/quizzes/useGetLatestQuizAttempt";
import QuizFinished from "./QuizFinished";
import useUpdateUserQuizAttempt from "../../hooks/quizzes/useUpdateUserQuizAttempt";
import useUpdateUserContentStatus from "../../hooks/users/useUpdateUserContentStatus";

function QuizView() {

  const router = useRouter()
  const { cid: quizId } = router.query
  
  const {createUserQuizAttempt} = useCreateUserQuizAttempt()
  const {updateUserQuizAttempt} = useUpdateUserQuizAttempt()
  const {updateUserContentStatus} = useUpdateUserContentStatus()

  const { loading, data, error } = useGetLatestQuizAttempt({quizId})
  const latestUserQuizAttempt = data?.latestUserQuizAttempt
  
  useEffect(() => {
    if(typeof latestUserQuizAttempt !== 'undefined' && latestUserQuizAttempt === null) {
      createUserQuizAttempt({
        contentItemId: quizId,
      })
    }
  },[latestUserQuizAttempt, quizId])

  const finishQuiz = () => {
    if(latestUserQuizAttempt) {
      updateUserQuizAttempt({
        id: latestUserQuizAttempt.id,
        finishedTime: new Date().toUTCString()
      })
      updateUserContentStatus({
        contentItemId: quizId,
        score: 100,
        status: 'completed'
      })
    }
  }

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
        {
          latestUserQuizAttempt && (
            latestUserQuizAttempt.finishedTime ? (
              <QuizFinished />
            ) : (
              activeQuestion && (
                <QuestionView
                  onFinishQuiz={finishQuiz}
                 />
              )
            )
          )
        }
      </div>
      {/* <QuizProgress /> */}
  </div>
  )
}

export default QuizView