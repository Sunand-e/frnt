import { useRouter } from "../../utils/router";
import { useQuizStore } from "./useQuizStore"
import useGetLatestQuizAttempt from "../../hooks/quizzes/useGetLatestQuizAttempt";
import Button from "../common/Button";
import {RestartAlt} from '@styled-icons/material-rounded/RestartAlt'
import useCreateUserQuizAttempt from "../../hooks/quizzes/useCreateUserQuizAttempt";
import { useFragment_experimental } from "@apollo/client";
import { QuizFragment } from "../../graphql/queries/allQueries";
import PrevNextButtons from "../courses/CourseView/PrevNextButtons";
import QuizSummaryActions from "./QuizSummaryActions";
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
      <h2 className="mb-6 text-main text-3xl">
        {'Quiz complete'}
      </h2>
      {quizAttempt && (
        <>
          <h4 className="mb-3 text-main text-2xl">
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
          <h4 className="mb-3 text-main text-xl">
            Your score: <strong>{quizAttempt.score}%</strong>
          </h4>
        </>
      )}
      <QuizSummaryActions/>
      <PrevNextButtons
        showPrevious={false}
      />
    </div>
  )
}

export default QuizSummary