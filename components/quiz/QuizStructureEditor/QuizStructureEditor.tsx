import { produce } from 'immer'
import { useImmer } from "use-immer";
import QuestionContainer from './QuestionContainer';
import { v4 as uuidv4 } from 'uuid';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from 'next/router';
import useCreateQuestion from '../../../hooks/questions/useCreateQuestion';
import useUpdateQuestion from '../../../hooks/questions/useUpdateQuestion';
import useDeleteQuestion from '../../../hooks/questions/useDeleteQuestion';
import { useFragment_experimental } from '@apollo/client';
import { QuizFragment } from '../../../graphql/queries/allQueries';
import useGetQuiz from '../../../hooks/quizzes/useGetQuiz';
import { Question, useQuizStore } from '../useQuizStore';
import { useEditorViewStore } from '../../common/ContentEditor/useEditorViewStore';

const QuizStructureEditor = () => {

  const router = useRouter()
  const { cid: quizId } = router.query

  // const { createQuestion } = useCreateQuestion(quizId)
  // const { deleteQuestion } = useDeleteQuestion()
  const questions = useQuizStore(state => state.questions)
  // const [questions, setQuestions] = useImmer([
  //   {
  //     id: "React",
  //     title: "Learn React",
  //     answers: [
  //       {
  //         content: 'True',
  //         correct: true,
  //       },
  //       {
  //         content: 'False',
  //       }
  //     ]
  //   },
  //   {
  //     id: "Immer",
  //     title: "Try Immer",
  //     answers: []
  //   }
  // ])

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: uuidv4(),
      questionType: 'simple',
      content: 'New question',
      answers: []
    }
    useQuizStore.setState(state => ({
      questions: [ ...state.questions, newQuestion]
    }))
    // createQuestion(newQuestion)
  }

  const handleRemoveQuestion = (question: Question) => {
    useQuizStore.setState(({questions}) => ({
      questions: questions.filter(q => q.id !== question.id)
    }))
  }

  const handleSelect = (id) => {
    useEditorViewStore.setState({activeSettingsPanel: 'question'})
    router.push({
      pathname: `/admin/courses/edit`,
      query: {
        ...router.query,
        q: id
      }
    })
  }
  return questions && (
    // <div className="p-4 bg-white rounded-lg shadow-md">
    <div className="p-4">
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