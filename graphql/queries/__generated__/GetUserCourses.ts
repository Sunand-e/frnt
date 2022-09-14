/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserCourses
// ====================================================

export interface GetUserCourses_user_courses_edges_node_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface GetUserCourses_user_courses_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  tags: GetUserCourses_user_courses_edges_node_tags[] | null;
}

export interface GetUserCourses_user_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserCourses_user_courses_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUserCourses_user_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetUserCourses_user_courses_edges | null)[] | null;
  totalCount: number;
}

export interface GetUserCourses_user {
  __typename: "User";
  courses: GetUserCourses_user_courses | null;
}

export interface GetUserCourses {
  /**
   * Get an user based on id
   */
  user: GetUserCourses_user;
}

export interface GetUserCoursesVariables {
  id?: string | null;
}
