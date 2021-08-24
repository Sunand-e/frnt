/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetQuizzes
// ====================================================

export interface GetQuizzes_quizzes_questions {
  __typename: "Question";
  answers: any | null;
  content: any | null;
  createdAt: any;
  id: string;
  order: number | null;
  questionType: string | null;
}

export interface GetQuizzes_quizzes {
  __typename: "ContentItem";
  order: number | null;
  title: string | null;
  updatedAt: any;
  prerequisites: any | null;
  id: string;
  itemType: string;
  content: any | null;
  createdAt: any;
  questions: GetQuizzes_quizzes_questions[] | null;
}

export interface GetQuizzes {
  /**
   * Get list of all quizzes
   */
  quizzes: GetQuizzes_quizzes[];
}
