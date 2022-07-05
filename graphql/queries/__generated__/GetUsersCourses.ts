/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUsersCourses
// ====================================================

export interface GetUsersCourses_users_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUsersCourses_users_courses_edges_node {
  __typename: "ContentItem";
  id: string;
}

export interface GetUsersCourses_users_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUsersCourses_users_courses_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUsersCourses_users_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetUsersCourses_users_courses_edges | null)[] | null;
  totalCount: number;
}

export interface GetUsersCourses_users {
  __typename: "User";
  createdAt: any;
  email: string;
  firstName: string | null;
  fullName: string | null;
  id: string;
  lastName: string | null;
  status: string;
  updatedAt: any;
  userType: string | null;
  roles: GetUsersCourses_users_roles[] | null;
  courses: GetUsersCourses_users_courses | null;
}

export interface GetUsersCourses {
  /**
   * Get list of all users
   */
  users: GetUsersCourses_users[];
}
