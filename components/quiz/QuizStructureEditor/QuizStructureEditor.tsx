import QuestionContainer from './QuestionContainer';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import useCreateQuestion from '../../../hooks/questions/useCreateQuestion';
import useDeleteQuestion from '../../../hooks/questions/useDeleteQuestion';
import { Question, useQuizStore } from '../useQuizStore';
import { useEditorViewStore } from '../../common/ContentEditor/useEditorViewStore';

const QuizStructureEditor = () => {

  const router = useRouter()
  const questions = useQuizStore(state => state.questions)

  // const { createQuestion } = useCreateQuestion(quizId)
  // const { deleteQuestion } = useDeleteQuestion()

  const handleAddQuestion = () => {
    const id = uuidv4()
    const newQuestion: Question = {
      id,
      questionType: 'single',
      content: 'New question',
      answers: []
    }

    useQuizStore.setState(state => ({
      questions: [ ...state.questions, newQuestion],
      activeQuestionId: id,
      isDirty: true
    }))

    // createQuestion(newQuestion)
  }

  const handleRemoveQuestion = (question: Question) => {
    useQuizStore.setState(({questions}) => ({
      questions: questions.filter(q => q.id !== question.id),
      isDirty: true
    }))
    // deleteQuestion(newQuestion)
  }

  const handleSelect = (id) => {
    useEditorViewStore.setState({
      activeSettingsPanel: 'question',
    })
    useQuizStore.setState({activeQuestionId: id})
  }
  return questions && (
    // <div className="p-4 bg-white rounded-lg shadow-md">
    <div>
      {questions.map((question, index) => (
        <QuestionContainer
          onSelect={handleSelect}
          key={question.id}
          question={question}
          index={index}
          onRemove={handleRemoveQuestion}
        />
      ))}
      <button onClick={handleAddQuestion} className="text-main hover:font-bold">
        + Add question
      </button>
    </div>
    // <DndContext>
    //   <SortableContext items={questions} strategy={strategy}>
    //     {questions.map((id, index) => {
    //       return (
    //         <SortableItem
    //           renderItem={<Question />}
    //           key={id}
    //           id={id}
    //           index={index}
    //         />
    //       );
    //     })}
    //   </SortableContext>
    // </DndContext>
  )
}

export default QuizStructureEditor