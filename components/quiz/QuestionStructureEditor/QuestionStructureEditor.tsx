import { produce } from 'immer'
import { useImmer } from "use-immer";
import QuestionContainer from './QuestionContainer';
import { v4 as uuidv4 } from 'uuid';
import { useDebouncedCallback } from 'use-debounce';

const QuestionStructureEditor = ({ question, type, onUpdate }) => {

  const [questions, setQuestions] = useImmer([
    {
      id: "React",
      title: "Learn React",
    },
    {
      id: "Immer",
      title: "Try Immer",
    }
  ])
  
  const handleAddQuestion = () => {
    setQuestions(draft => {
      draft.push({
        id: uuidv4(),
        title: '',
      })
    })
  };

  const handleRemoveQuestion = (question) => {
    setQuestions(draft => {
      draft = draft.filter(
        o => o.id !== question.id
      )
    })
  };
  
  return (
    // <div className="p-4 bg-white rounded-lg shadow-md">
    <div className="p-4">
      {question.map((question, index) => (
        <QuestionContainer
          key={question.id}
          question={question}
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
  );
}

export default QuestionStructureEditor