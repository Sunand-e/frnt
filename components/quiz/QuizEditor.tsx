import { useFragment_experimental } from '@apollo/client';
import { useCallback, useEffect } from 'react';
import useUpdateQuiz from '../../hooks/quizzes/useUpdateQuiz';
import { useRouter } from '../../utils/router';
import { useEditorViewStore } from '../common/ContentEditor/useEditorViewStore';
import { useSaveContentButton } from '../common/ContentEditor/useSaveContentButton';
import QuestionEditor from './questions/QuestionEditor';
import { Question, useQuizStore } from './useQuizStore';
import { QuizFragment } from '../../graphql/queries/allQueries';

const QuizEditor = () => {

  const router = useRouter()
  const { cid: quizId } = router.query
  
  const { data: quiz } = useFragment_experimental({
    fragment: QuizFragment,
    fragmentName: 'QuizFragment',
    from: { id: quizId, __typename: "ContentItem", },
  });

  const questions = useQuizStore(state => state.questions)
  const activeQuestion = useQuizStore(state => state.computed.activeQuestion())
  const isDirty = useQuizStore(state => state.isDirty)
  const { updateQuiz } = useUpdateQuiz()

     
  useEffect(() => {
    useQuizStore.setState({
      questions: quiz.questions,
      activeQuestionId: quiz.questions[0]?.id
    })
  },[quiz.id])

  const handleSave = useCallback(async () => {
    const questionsInput = questions.map((q, index) => ({
      answers: q.answers,
      content: q.content,
      id: q.id,
      order: index,
      questionType: q.questionType
    }))

    await updateQuiz(quizId)({questions: questionsInput})
    useQuizStore.setState({isDirty: false})

  },[questions, isDirty, updateQuiz])
  
  useSaveContentButton({
    buttonText: 'Save quiz', 
    onSave: handleSave, 
    isDirty
  })

  const handleUpdateQuestion = (question: Question) => {
    useQuizStore.setState(({questions}) => {

      return ({
      questions: questions.map(q => ( question.id === q.id ? question : q )),
      isDirty: true
    })})
  };
  
  const showQuestionsPanel = () => {
    useEditorViewStore.setState({activeSidebarPanel: 'questions'})
  }
  
  return (
    activeQuestion ? (
      <div
        className="h-full w-full p-16"
        onClick={showQuestionsPanel}
      >
        <QuestionEditor onUpdate={handleUpdateQuestion} question={activeQuestion} />
      </div>
    ) : (
      <div className={`p-12 flex justify-center`}>
        <div className="w-full max-w-screen-lg bg-main p-4 bg-opacity-10 border-2 border-dashed border-grey">
          <div className={`text-center text-main-secondary py-4`}>
            Select a question from the <b>Questions</b> panel.
          </div>
        </div>
      </div>
    )
  );
}

export default QuizEditor