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
import { AnimatePresence, motion } from "framer-motion";

function QuizView() {

  const router = useRouter()
  const { cid: quizId } = router.query
  
  const {createUserQuizAttempt} = useCreateUserQuizAttempt()
  const {updateUserQuizAttempt} = useUpdateUserQuizAttempt()
  const {updateUserContentStatus} = useUpdateUserContentStatus()

  const { loading, data, error } = useGetLatestQuizAttempt({quizId})
  const latestUserQuizAttempt = data?.latestUserQuizAttempt
  
  useEffect(() => {
    console.log('typeof latestUserQuizAttempt')
    console.log(typeof latestUserQuizAttempt)
    console.log('latestUserQuizAttempt')
    console.log(latestUserQuizAttempt)
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
        completedAt: new Date().toUTCString()
      })
      updateUserContentStatus({
        contentItemId: quizId,
        progress: 100,
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
      <AnimatePresence>
      <motion.div
        key={activeQuestion?.id}
        className="p-12 bg-white rounded-lg shadow-md w-full flex justify-center"
        initial={{ opacity: 0, x: 500, position: 'absolute' }}
        animate={{ opacity: 1, x: 0, position: 'relative' }}
        exit={{ opacity: 0, x: -500, position: 'absolute' }}
        transition={{duration: 0.6}}
      >
      <pre>
      {/* { JSON.stringify(latestUserQuizAttempt,null,2) } */}
      </pre>
        {
          latestUserQuizAttempt && (
            latestUserQuizAttempt.completedAt ? (
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
      </motion.div>
      </AnimatePresence>
      {/* <QuizProgress /> */}
  </div>
  )
}

export default QuizView