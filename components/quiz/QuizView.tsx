import { useFragment_experimental } from "@apollo/client";
import { useEffect } from "react";
import { QuizFragment } from "../../graphql/queries/allQueries";
import { useRouter } from "../../utils/router";
import Button from "../common/Button";
import QuestionContainer from "./questions/QuestionContainer";
import { useQuizStore } from "./useQuizStore"

function QuizView() {

  const router = useRouter()
  const { cid: quizId } = router.query
  
  const { data: quiz } = useFragment_experimental({
    fragment: QuizFragment,
    fragmentName: 'QuizFragment',
    from: { id: quizId, __typename: "ContentItem", },
  });

  const questions = useQuizStore(state => state.questions)
  const activeQuestion = useQuizStore(state => state.computed.activeQuestion())
  
  const submitAnswer = () => {
    activeQuestion
  }

  useEffect(() => {
    useQuizStore.setState({
      questions: quiz.questions,
      activeQuestionId: quiz.questions[0]?.id,
      isEditMode: false
    })
  },[quiz.id])

  return (
    <div
      className="h-full w-full p-16"
    >
      <div className="p-12 bg-white rounded-lg shadow-md w-full flex justify-center">
        { activeQuestion && (
          <div className="max-w-screen-lg w-full">
            <h3 className="mb-3 text-gray-400">
              {'Question '}
              <span className="font-bold">
                {questions.findIndex(q => q.id === activeQuestion.id) + 1}
              </span>
              {' of '}
              <span className="font-bold">
                {questions.length}
              </span>
            </h3>
            <QuestionContainer question={activeQuestion} />
            <Button onClick={submitAnswer}>Submit</Button>
          </div>
        )}
      </div>
  </div>
  )
}

export default QuizView