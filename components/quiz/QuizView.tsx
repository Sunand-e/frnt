import { useFragment } from "@apollo/client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { QuizFragment } from "../../graphql/queries/allQueries";
import useCreateUserQuizAttempt from "../../hooks/quizzes/useCreateUserQuizAttempt";
import useGetLatestQuizAttempt from "../../hooks/quizzes/useGetLatestQuizAttempt";
import useUpdateUserQuizAttempt from "../../hooks/quizzes/useUpdateUserQuizAttempt";
import useUpdateUserContentStatus from "../../hooks/users/useUpdateUserContentStatus";
import Button from "../common/Button";
import { useRouter } from "../../utils/router";
import QuestionView from "./questions/QuestionView";
import QuizSummary from "./QuizSummary";
import { useQuizStore } from "./useQuizStore";

function QuizView() {

  const router = useRouter()
  const { cid: quizId } = router.query
  
  const {createUserQuizAttempt} = useCreateUserQuizAttempt()
  const {updateUserQuizAttempt} = useUpdateUserQuizAttempt()
  const {updateUserContentStatus} = useUpdateUserContentStatus()

  const { loading, data, error } = useGetLatestQuizAttempt({quizId})

  const { data: quiz } = useFragment({
    fragment: QuizFragment,
    fragmentName: 'QuizFragment',
    from: { id: quizId, __typename: "ContentItem", },
  });

  useEffect(() => {
    // Check if the quiz attempt is not set and the latestUserQuizAttempt data is available
    if (data && typeof data?.latestUserQuizAttempt !== 'undefined') {
      // If the latestUserQuizAttempt is null, create a new quiz attempt
      if (data?.latestUserQuizAttempt === null) {
        createUserQuizAttempt({
          contentItemId: quizId,
        });
      }
    }
  }, [data, quizId]);
  
  useEffect(() => {
    // Check if the quiz attempt is not set and the latestUserQuizAttempt data is available
    if (data?.latestUserQuizAttempt) {
      // If a quiz attempt exists, set the attempted question IDs and update the quiz state
      const attemptedQuestionIds = data.latestUserQuizAttempt.userQuestionAttempts.map(
        attempt => attempt.question.id
      );
      const remainingQuestions = quiz.questions.filter(q => !attemptedQuestionIds.includes(q.id))
      const randomQuestion = remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)]
      useQuizStore.setState({
        activeQuestionId: randomQuestion?.id,
        isEditMode: false
      });
    }
  }, [data?.latestUserQuizAttempt?.id, quizId]);


  const activeQuestion = useQuizStore(state => state.computed.activeQuestion())

  const finishQuiz = () => {
    if(data?.latestUserQuizAttempt) {
      
      updateUserQuizAttempt({
        id: data.latestUserQuizAttempt.id,
        finished: true
      })

      updateUserContentStatus({
        contentItemId: quizId,
        progress: 100,
        status: 'completed'
      }) 
    }
  }
  
  useEffect(() => {
    useQuizStore.setState({
      questions: quiz.questions,
      isEditMode: false
    })
  },[quiz.id])

  useEffect(() => {
    useQuizStore.setState({
      attemptOptionIds: []
    })
  },[activeQuestion])

  const completed = data?.latestUserQuizAttempt?.completedAt

  // calculate the number of questions remaining, in case the questions 
  // have been completed but 'finish quiz' has not been clicked:
  const questionsLength = useQuizStore(state => state.questions.length)
  const totalQuestions = quiz.settings.limitQuestions ? quiz.settings.questionCount : questionsLength
  const questionAttempts = data.latestUserQuizAttempt.userQuestionAttempts
  const questionsRemaining = totalQuestions - questionAttempts.length

  return (
    <div className="h-full w-full p-16 relative overflow-x-hidden">
      <AnimatePresence>
      <motion.div
        key={activeQuestion?.id+completed}
        className="p-12 bg-white rounded-lg shadow-md w-full flex justify-center"
        initial={{ opacity: 0, x: 500, position: 'absolute' }}
        animate={{ opacity: 1, x: 0, position: 'relative' }}
        exit={{ opacity: 0, x: -500, position: 'absolute' }}
        transition={{duration: 0.6}}
      >
        {
          data?.latestUserQuizAttempt && (
            completed ? (
              <QuizSummary />
            ) : (
              activeQuestion ? (
                <QuestionView
                  question={activeQuestion}
                  onFinishQuiz={finishQuiz}
                />
              ) : (
                questionsRemaining === 0 && (
                  <div className="flex flex-col items-center space-y-4">
                    <Button onClick={finishQuiz} className="bg-main text-white px-4 py-2 rounded-md">Finish Quiz</Button>
                  </div>
                )
              )
            )
          )
        }
      </motion.div>
      </AnimatePresence>
      {/* <QuizProgress /> */}
  </div>
  )
}

export default QuizView