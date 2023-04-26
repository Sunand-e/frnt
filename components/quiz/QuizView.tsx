import { useFragment_experimental } from "@apollo/client";
import { useEffect } from "react";
import { QuizFragment } from "../../graphql/queries/allQueries";
import { useRouter } from "../../utils/router";
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
    { activeQuestion && <QuestionContainer question={activeQuestion} /> }
  </div>
  )
}

export default QuizView