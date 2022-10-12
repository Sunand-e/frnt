/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getLessonsUsers
// ====================================================

export interface getLessonsUsers_lesson_users_edges_node {
  __typename: "User";
  id: string;
  fullName: string | null;
  email: string;
}

export interface getLessonsUsers_lesson_users_edges {
  __typename: "ContentUserEdge";
  /**
   * The item at the end of the edge.
   */
  node: getLessonsUsers_lesson_users_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface getLessonsUsers_lesson_users {
  __typename: "ContentUserConnection";
  /**
   * A list of edges.
   */
  edges: (getLessonsUsers_lesson_users_edges | null)[] | null;
  totalCount: number;
}

export interface getLessonsUsers_lesson {
  __typename: "ContentItem";
  users: getLessonsUsers_lesson_users | null;
}

export interface getLessonsUsers {
  /**
   * Get an lessons based on your conditions or based on id
   */
  lesson: getLessonsUsers_lesson;
}

export interface getLessonsUsersVariables {
  lessonId: string;
}
