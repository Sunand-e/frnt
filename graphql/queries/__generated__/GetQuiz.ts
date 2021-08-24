/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetQuiz
// ====================================================

export interface GetQuiz_quiz_questions {
  __typename: "Question";
  answers: any | null;
  content: any | null;
  createdAt: any;
  id: string;
  order: number | null;
  questionType: string | null;
}

export interface GetQuiz_quiz {
  __typename: "ContentItem";
  order: number | null;
  title: string | null;
  updatedAt: any;
  prerequisites: any | null;
  id: string;
  itemType: string;
  content: any | null;
  createdAt: any;
  questions: GetQuiz_quiz_questions[] | null;
}

export interface GetQuiz {
  /**
   * Get an quizs based on your conditions or based on id
   */
  quiz: GetQuiz_quiz[];
}
