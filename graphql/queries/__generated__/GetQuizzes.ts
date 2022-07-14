/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetQuizzes
// ====================================================

export interface GetQuizzes_quizzes_edges_node_questions {
  __typename: "Question";
  answers: any | null;
  content: any | null;
  createdAt: any;
  id: string;
  questionType: string | null;
}

export interface GetQuizzes_quizzes_edges_node {
  __typename: "ContentItem";
  title: string | null;
  updatedAt: any;
  prerequisites: any | null;
  id: string;
  itemType: string;
  content: any | null;
  createdAt: any;
  questions: GetQuizzes_quizzes_edges_node_questions[] | null;
}

export interface GetQuizzes_quizzes_edges {
  __typename: "ContentItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetQuizzes_quizzes_edges_node | null;
}

export interface GetQuizzes_quizzes {
  __typename: "ContentItemConnection";
  /**
   * A list of edges.
   */
  edges: (GetQuizzes_quizzes_edges | null)[] | null;
}

export interface GetQuizzes {
  /**
   * Get list of all quizzes
   */
  quizzes: GetQuizzes_quizzes;
}
