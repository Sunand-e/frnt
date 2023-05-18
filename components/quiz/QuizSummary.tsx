import { useRouter } from "../../utils/router";
import { useQuizStore } from "./useQuizStore"
import useGetLatestQuizAttempt from "../../hooks/quizzes/useGetLatestQuizAttempt";
import Button from "../common/Button";
import {RestartAlt} from '@styled-icons/material-rounded/RestartAlt'
import useCreateUserQuizAttempt from "../../hooks/quizzes/useCreateUserQuizAttempt";
import { useFragment_experimental } from "@apollo/client";
import { QuizFragment } from "../../graphql/queries/allQueries";
function QuizSummary() {

  const router = useRouter()
  const { cid: quizId } = router.query
  
  const {loading, data, error} = useGetLatestQuizAttempt({quizId})
  const { data: quiz } = useFragment_experimental({
    fragment: QuizFragment,
    fragmentName: 'QuizFragment',
    from: { id: quizId, __typename: "ContentItem", },
  });

  const quizAttempt = data?.latestUserQuizAttempt
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
        <div className="max-w-screen-lg w-full text-center">
          <h2 className="mb-6 text-main text-2xl">
            {'Quiz complete'}
          </h2>
          {quizAttempt && (
            <>
              <h4 className="mb-3 text-main text-xl">
                { quizAttempt.status === 'passed' ? (
                  'Congratulations, you passed!'
                  ) : (
                    <>
                    You failed the quiz.
                    { quiz.settings.passMark && `You need to score ${quiz.settings.passMark}% to pass.`}
                    </>
                  )
                }
              </h4>
              <h4 className="mb-3 text-main text-xlg">
                Your score: {quizAttempt.score}%
              </h4>
            </>
          )}
          <Button onClick={startNewAttempt}>
          <span className="flex items-center xl:space-x-2">
            <RestartAlt width={26}/>
            Start New Attempt
          </span>
          </Button>
      </div>
  )
}

export default QuizSummary