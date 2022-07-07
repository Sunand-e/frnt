/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUsersLessons
// ====================================================

export interface getUsersLessons_user_lessons_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
}

export interface getUsersLessons_user_lessons_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: getUsersLessons_user_lessons_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface getUsersLessons_user_lessons {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (getUsersLessons_user_lessons_edges | null)[] | null;
  totalCount: number;
}

export interface getUsersLessons_user {
  __typename: "User";
  lessons: getUsersLessons_user_lessons | null;
}

export interface getUsersLessons {
  /**
   * Get an user based on id
   */
  user: getUsersLessons_user;
}

export interface getUsersLessonsVariables {
  userId: string;
  where?: any | null;
}
