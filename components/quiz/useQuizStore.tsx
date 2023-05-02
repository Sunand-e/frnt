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
  settings: {
    feedback?: {
      type?: string
      single?: string
      correct?: string
      incorrect?: string
    }
  }
}

export type QuizState = {
  isDirty: boolean
  questions: Array<Question>
  activeQuestionId: string
  settings?: {
    feedback?: string
  }
  isEditMode: boolean
  computed?: {
    activeQuestion: () => Question
  }
  activeAnswerIndex: number
}
const initialState: QuizState = {
  isDirty: false,
  questions: [],
  isEditMode: false,
  activeQuestionId: null,
  activeAnswerIndex: null
}

export const useQuizStore = create<QuizState>((set, get) => ({
  ...initialState,
  computed: {
    // See: https://github.com/pmndrs/zustand/issues/132#issuecomment-1120467721
    activeQuestion: () => get().questions.find(q => q.id === get().activeQuestionId)
  },
}))

export const resetQuizStore = () => {
  useQuizStore.setState(initialState)
}