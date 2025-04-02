import { useFragment } from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import useCreateUserQuestionAttempt from "../../../hooks/questions/useCreateUserQuestionAttempt";
import { useRouter } from "../../../utils/router";
import Button from "../../common/Button";
import QuestionContainer from "../questions/QuestionContainer";
import { useQuizStore } from "../useQuizStore"
import xor from 'lodash/xor';
import FeedbackContainer from "./FeedbackContainer";
import { QuizFragment } from "../../../graphql/queries/allQueries";
import useGetLatestQuizAttempt from "../../../hooks/quizzes/useGetLatestQuizAttempt";

function QuestionView({ question, onFinishQuiz }) {

  const router = useRouter()
  const { cid: quizId } = router.query
  const [loadingNextquestion, setLoadingNextquestion] = useState(false);

  const { data: attemptQueryData, error } = useGetLatestQuizAttempt({ quizId })

  const { data: quiz } = useFragment({
    fragment: QuizFragment,
    fragmentName: 'QuizFragment',
    from: { id: quizId, __typename: "ContentItem", },
  });

  const { loading, createUserQuestionAttempt } = useCreateUserQuestionAttempt({
    quizAttemptId: attemptQueryData?.latestUserQuizAttempt.id
  })

  const questions = useQuizStore(state => state.questions)
  const attemptOptionIds = useQuizStore(state => state.attemptOptionIds)

  const [status, setStatus] = useState('unanswered')

  const totalQuestions = quiz.settings.limitQuestions ? quiz.settings.questionCount : questions.length
  const questionAttempts = attemptQueryData.latestUserQuizAttempt.userQuestionAttempts

  const attemptedQuestionIds = questionAttempts.map(attempt => attempt.question.id)

  const remainingQuestions = questions.filter(q => {
    return !attemptedQuestionIds.includes(q.id)
  })
  const isLastQuestion = useMemo(() => (
    questionAttempts.length >= totalQuestions
  ), [question, questionAttempts, totalQuestions])

  const nextRandomQuestion = remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)]
  const nextQuestion = totalQuestions > questionAttempts.length ? nextRandomQuestion : null

  // Get the question number from the number of UserQuestionAttempts
  const questionNum = useMemo(() => (
    questionAttempts.length + 1
  ), [question])



  const submitDisabled = attemptOptionIds.length === 0

  const goToNextQuestion = () => {
    useQuizStore.setState({
      activeQuestionId: nextQuestion.id,
    })
    setStatus('unanswered')
  }

  const submitAnswer = () => {

    const answers = question.answers.filter((answer: any) => attemptOptionIds.includes(answer.id))
    const correctAnswerIds = question.answers.filter((a: any) => a.correct).map((a: any) => a.id)
    const isCorrect = xor(correctAnswerIds, attemptOptionIds).length === 0
    const status = isCorrect ? 'correct' : 'incorrect'

    createUserQuestionAttempt({
      userQuizAttemptId: attemptQueryData?.latestUserQuizAttempt.id,
      questionId: question.id,
      score: isCorrect ? 100 : 0,
      status,
      answers
    })

    setStatus(status)

    setLoadingNextquestion(true)
  }

  useEffect(() => {
    if (quiz.settings.feedback === 'off' && loadingNextquestion && !loading) {
      setLoadingNextquestion(false)
      if (nextQuestion) {
        goToNextQuestion()
      }
      else {
        onFinishQuiz()
      }
    }
  }, [questionAttempts, loading])

  const handleOptionSelect = useCallback((option: any, value: any) => {
    if (question.questionType === 'multi') {
      useQuizStore.setState({
        attemptOptionIds: value ? (
          attemptOptionIds.includes(option.id) ? attemptOptionIds : [...attemptOptionIds, option.id]
        ) : (
          attemptOptionIds.filter(id => id !== option.id)
        )
      })
    } else {
      useQuizStore.setState({
        attemptOptionIds: [option.id]
      })
    }
  }, [question?.questionType, attemptOptionIds])
  return (
    <div className="max-w-screen-lg w-full">
      <h3 className="mb-3 text-gray-400">
        {'Question '}
        <span className="font-bold">
          {questionNum}
        </span>
        {' of '}
        <span className="font-bold">
          {quiz.settings.limitQuestions ? quiz.settings.questionCount : questions.length}
        </span>
      </h3>
      <QuestionContainer
        disabled={status !== 'unanswered'}
        question={question}
        onOptionSelect={handleOptionSelect}
        selectedOptionIds={attemptOptionIds}
      />
      {status === 'unanswered' ? (
        <Button className="mt-2" onClick={submitAnswer} disabled={submitDisabled}>Submit</Button>
      ) : quiz.settings.feedback !== 'off' && (
        <FeedbackContainer status={status} question={question}>
          {nextQuestion && (
            <Button className="mt-2" onClick={goToNextQuestion}>Next question</Button>
          )}
          {isLastQuestion && (
            <>
              <p className="text-center">
                You have now completed all of the questions in this quiz.<br />
                Please click the 'Finish Quiz' button below to finalise your quiz attempt.
              </p>
              <Button className="mt-2" onClick={onFinishQuiz}>Finish quiz</Button>
            </>
          )}
        </FeedbackContainer>
      )}

    </div>
  )
}

export default QuestionView