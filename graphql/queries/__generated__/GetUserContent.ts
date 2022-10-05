/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserContent
// ====================================================

export interface GetUserContent_user_courses_edges_node_sections_lessons {
  __typename: "ContentItem";
  id: string;
}

export interface GetUserContent_user_courses_edges_node_sections {
  __typename: "ContentItem";
  id: string;
  lessons: GetUserContent_user_courses_edges_node_sections_lessons[] | null;
}

export interface GetUserContent_user_courses_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  content: any | null;
  contentType: string | null;
  itemType: string;
  sections: GetUserContent_user_courses_edges_node_sections[] | null;
}

export interface GetUserContent_user_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserContent_user_courses_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUserContent_user_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetUserContent_user_courses_edges | null)[] | null;
  totalCount: number;
}

export interface GetUserContent_user_sections_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  content: any | null;
  contentType: string | null;
  itemType: string;
}

export interface GetUserContent_user_sections_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserContent_user_sections_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUserContent_user_sections {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetUserContent_user_sections_edges | null)[] | null;
  totalCount: number;
}

export interface GetUserContent_user_lessons_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  content: any | null;
  contentType: string | null;
  itemType: string;
}

export interface GetUserContent_user_lessons_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserContent_user_lessons_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUserContent_user_lessons {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetUserContent_user_lessons_edges | null)[] | null;
  totalCount: number;
}

export interface GetUserContent_user {
  __typename: "User";
  id: string;
  courses: GetUserContent_user_courses | null;
  sections: GetUserContent_user_sections | null;
  lessons: GetUserContent_user_lessons | null;
}

export interface GetUserContent {
  /**
   * Get an user based on id
   */
  user: GetUserContent_user;
}

export interface GetUserContentVariables {
  courseFilter?: any | null;
  lessonSectionFilter?: any | null;
}
