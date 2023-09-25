import { useRouter } from "../../utils/router";
import { useQuizStore } from "./useQuizStore"
import useGetLatestQuizAttempt from "../../hooks/quizzes/useGetLatestQuizAttempt";

function QuizProgress() {

  const router = useRouter()
  const { cid: quizId } = router.query
  
  const {loading, data, error} = useGetLatestQuizAttempt({quizId})

  const questions = useQuizStore(state => state.questions)
  const questionAttempts = data?.latestUserQuizAttempt?.userQuestionAttempts || []
  const orderedQuestionAttempts = questions.map(q => {
    return questionAttempts.find(qa => qa.question.id === q.id) || {
      id: null,
      question: q,
      status: null,
    }
  })

  return (
    <div className="h-full w-full p-16">
      {/* <pre>
      { JSON.stringify(data,null,2) }
      </pre> */}
      <div className="flex space-x-4">
        { orderedQuestionAttempts.map((attempt, index) => (
          <span key={index+attempt.id}>{attempt.id} - {attempt.status ? attempt.status : 'none'}</span>
        )) }
      </div>
    </div>
  )
}

export default QuizProgress