import { useFragment_experimental } from '@apollo/client';
import { useCallback, useEffect, useLayoutEffect } from 'react';
import useUpdateQuiz from '../../hooks/quizzes/useUpdateQuiz';
import { useRouter } from '../../utils/router';
import { useEditorViewStore } from '../common/ContentEditor/useEditorViewStore';
import { useSaveContentButton } from '../common/ContentEditor/useSaveContentButton';
import QuestionEditor from './questions/QuestionEditor';
import { Question, useQuizStore } from './useQuizStore';
import { QuizFragment } from '../../graphql/queries/allQueries';
import useWarningOnExit from '../../hooks/useWarningOnExit';
import { AVAILABLE_TRANSITIONS } from '@mantine/core';

const QuizEditor = () => {

  const router = useRouter()
  const { cid: quizId } = router.query
  const { data: quiz } = useFragment_experimental({
    fragment: QuizFragment,
    fragmentName: 'QuizFragment',
    from: { id: quizId, __typename: "ContentItem", },
  });

  const questions = useQuizStore(state => state.questions)
  const settings = useQuizStore(state => state.settings)
  const activeQuestion = useQuizStore(state => state.computed.activeQuestion())
  const isDirty = useQuizStore(state => state.isDirty)
  const { updateQuiz } = useUpdateQuiz()

  useWarningOnExit(isDirty)
     
  useEffect(() => {
    useQuizStore.setState({
      questions: quiz.questions,
      activeQuestionId: quiz.questions[0]?.id,
      isEditMode: true
    })
    return () => {
      useQuizStore.destroy()
    }
  },[quiz.id])

  const handleSave = useCallback(async () => {
    const questionsInput = questions.map((q, index) => ({
      answers: q.answers,
      content: q.content,
      settings: q.settings,
      id: q.id,
      order: index,
      questionType: q.questionType
    }))

    await updateQuiz(quizId)({
      questions: questionsInput,
      settings
    })
    useQuizStore.setState({isDirty: false})

  },[questions, settings, isDirty, updateQuiz])
  
  useSaveContentButton({
    typeName: 'quiz', 
    onSave: handleSave, 
    isDirty
  })

  const handleUpdateQuestion = (question: Question) => {
    useQuizStore.setState(({questions}) => ({
      questions: questions.map(q => ( question.id === q.id ? question : q )),
      isDirty: true
    }))
  };
  
  return (
    <div
      className="h-full w-full p-16"
      onClick={() => useEditorViewStore.setState({activeSidebarPanel: 'questions'})}
      >
      { activeQuestion ? (
        <div
          className="p-12 bg-white rounded-lg shadow-md w-full flex justify-center"
          onClick={() => useEditorViewStore.setState({activeSettingsPanel: 'question'})}
        >
          <div className="max-w-screen-lg w-full">
            <h3 className='pb-1 border-b-1'>Question {questions.findIndex(q => q.id === activeQuestion.id) + 1} of {questions.length}</h3>
            <QuestionEditor onUpdate={handleUpdateQuestion} question={activeQuestion} />
          </div>
        </div>
      ) : (
        <div className={`p-12 flex justify-center`}>
          <div className="w-full max-w-screen-lg bg-main p-4 bg-opacity-10 border-2 border-dashed border-grey">
            <div className={`text-center text-main-secondary py-4`}>
              Select a question from the <b>Questions</b> panel.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizEditor