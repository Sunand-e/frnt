import { useFragment_experimental } from '@apollo/client';
import { RestartAlt } from '@styled-icons/material-rounded/RestartAlt';
import { QuizFragment } from '../../graphql/queries/allQueries';
import useCreateUserQuizAttempt from "../../hooks/quizzes/useCreateUserQuizAttempt";
import useGetUserQuizAttempts from '../../hooks/quizzes/useGetUserQuizAttempts';
import useUserHasCapability from '../../hooks/users/useUserHasCapability';
import { useRouter } from "../../utils/router";
import Button from "../common/Button";

function QuizSummaryActions() {

  const router = useRouter()
  const { id, cid: quizId } = router.query
  
  const { createUserQuizAttempt } = useCreateUserQuizAttempt()
  const { userHasCapability } = useUserHasCapability()

  const { data: quiz } = useFragment_experimental({
    fragment: QuizFragment,
    fragmentName: 'QuizFragment',
    from: { id: quizId, __typename: "ContentItem", },
  });

  const { loading: loadingAttempts, data: quizData, error: errorAttempts } = useGetUserQuizAttempts({id})
  const attempts = quizData?.quizzes?.edges[0].attempts || []
  const { limitAttempts, attemptLimit } = quiz?.settings || {}
  console.log('quiz?.settings')
  console.log(quiz?.settings)
  const startNewAttempt = () => {
    createUserQuizAttempt({
      contentItemId: quizId,
    })
  }

  const disabled = limitAttempts && (attempts.length >= attemptLimit) && !userHasCapability('AttemptQuizzesIndefinitely')
  return (
    <div>
      { !disabled && (
      <Button onClick={startNewAttempt} className="mb-6">
      <span className="flex items-center xl:space-x-2 ">
        <RestartAlt width={26}/>
        Start New Attempt
      </span>
      </Button>
      )}
    </div>
  )
}

export default QuizSummaryActions