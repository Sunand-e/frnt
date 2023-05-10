import { useRouter } from "../../utils/router";
import { useQuizStore } from "./useQuizStore"
import useGetLatestQuizAttempt from "../../hooks/quizzes/useGetLatestQuizAttempt";

function QuizFinished() {

  const router = useRouter()
  const { cid: quizId } = router.query
  
  const {loading, data, error} = useGetLatestQuizAttempt(quizId)

  const questions = useQuizStore(state => state.questions)
  const questionAttempts = data?.latestUserQuizAttempt.userQuestionAttempts || []
  const orderedQuestionAttempts = questions.map(q => {
    return questionAttempts.find(qa => qa.question.id === q.id) || {
      question: q,
      status: null
    }
  })
  
  return (
        <div className="max-w-screen-lg w-full">
          <h1 className="mb-3 text-main text-xl">
            {'Quiz complete'}
          </h1>
      </div>
  )
}

export default QuizFinished