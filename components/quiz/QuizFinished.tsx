import { useRouter } from "../../utils/router";
import { useQuizStore } from "./useQuizStore"
import useGetLatestQuizAttempt from "../../hooks/quizzes/useGetLatestQuizAttempt";
import Button from "../common/Button";
import {RestartAlt} from '@styled-icons/material-rounded/RestartAlt'
import useCreateUserQuizAttempt from "../../hooks/quizzes/useCreateUserQuizAttempt";
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

  const { createUserQuizAttempt } = useCreateUserQuizAttempt()
  
  const startNewAttempt = () => {
    createUserQuizAttempt({
      contentItemId: quizId,
    })
  }

  return (
        <div className="max-w-screen-lg w-full">
          <h1 className="mb-3 text-main text-xl">
            {'Quiz complete'}
          </h1>
          <Button onClick={startNewAttempt}>
          <span className="flex items-center xl:space-x-2">
            <RestartAlt width={26}/>
            Start New Attempt
          </span>
          </Button>
      </div>
  )
}

export default QuizFinished