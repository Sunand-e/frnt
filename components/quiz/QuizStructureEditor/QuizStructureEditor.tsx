import { v4 as uuidv4 } from 'uuid';
import { Question, useQuizStore } from '../useQuizStore';
import { useEditorViewStore } from '../../common/ContentEditor/useEditorViewStore';
import { DndContext, KeyboardSensor, MouseSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import SortableQuestion from './SortableQuestion';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useMemo, useState } from 'react';
import useConfirmDelete from '../../../hooks/useConfirmDelete';

const QuizStructureEditor = () => {
  const questions = useQuizStore(state => state.questions)
  const handleAddQuestion = () => {
    const id = uuidv4()
    const newQuestion: Question = {
      id,
      questionType: 'single',
      content: '',
      answers: [],
      settings: {}
    }

    useQuizStore.setState(state => ({
      questions: [ ...state.questions, newQuestion],
      activeQuestionId: id,
      isDirty: true
    }))

    // createQuestion(newQuestion)
  }

  const handleRemoveQuestion = (question: Question) => {
    const { confirmDelete } = useConfirmDelete({
      itemType: 'question',
      onConfirm: () => {
        useQuizStore.setState(({questions}) => ({
          questions: questions.filter(q => q.id !== question.id),
          isDirty: true
        }))    
      }
    })
    confirmDelete(question)
    // deleteQuestion(newQuestion)
  }

  const handleSelect = (id) => {
    useEditorViewStore.setState({
      activeSettingsPanel: 'question',
    })
    useQuizStore.setState({activeQuestionId: id})
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = active.data.current.sortable.index
      const newIndex = over.data.current.sortable.index
      useQuizStore.setState(state => ({
        isDirty: true,
        questions: arrayMove(state.questions, oldIndex, newIndex)
      }))
    }
  }
  
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return questions && (
    <div className='h-full flex flex-col'>
    <div
      className="scrollbar-thin -mr-3 pr-3 scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full overflow-x-auto"
    >
      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
      >
      <SortableContext items={questions} strategy={verticalListSortingStrategy}>
      {questions.map((question, index) => (
        <SortableQuestion
          onSelect={handleSelect}
          key={question.id}
          question={question}
          index={index}
          onRemove={handleRemoveQuestion}
        />
      ))}
      </SortableContext>
    
      </DndContext>
    </div>
    
    <button onClick={handleAddQuestion} className="text-main hover:font-bold p-3 pb-0 border-main border-t">
    + Add question
  </button>
  </div>
  )
}

export default QuizStructureEditor