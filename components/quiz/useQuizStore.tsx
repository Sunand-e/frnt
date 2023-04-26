import create from 'zustand'

export interface Answer {
  id?: string
  content: JSON | string
  correct: boolean
}

export interface Question {
  id?: string
  questionType?: string
  content?: JSON | string
  answers?: Array<Answer>
}

export type QuizState = {
  isDirty: boolean
  questions: Array<Question>
  activeQuestionId: string
  isEditMode: boolean
  computed: {
    activeQuestion: () => Question
  }
  activeAnswerIndex: number
}

export const useQuizStore = create<QuizState>((set, get) => ({
  isDirty: false,
  questions: [],
  isEditMode: false,
  activeQuestionId: null,
  activeAnswerIndex: null,
  computed: {
    // See: https://github.com/pmndrs/zustand/issues/132#issuecomment-1120467721
    activeQuestion: () => get().questions.find(q => q.id === get().activeQuestionId)
  },
}))