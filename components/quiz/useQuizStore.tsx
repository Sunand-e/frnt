import create from 'zustand'

export interface Answer {
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
  activeQuestion: Question
  activeAnswerIndex: number
}

export const useQuizStore = create<QuizState>(set => ({
  isDirty: false,
  questions: [],
  activeQuestion: null,
  activeAnswerIndex: null,
}))