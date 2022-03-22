/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_user_courses_edges_node {
  __typename: "ContentItem";
  id: string;
}

export interface GetUser_user_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUser_user_courses_edges_node | null;
}

export interface GetUser_user_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetUser_user_courses_edges | null)[] | null;
}

export interface GetUser_user {
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
  courses: GetUser_user_courses | null;
}

export interface GetUser {
  /**
   * Get an user based on id
   */
  user: GetUser_user;
}

export interface GetUserVariables {
  id: string;
}
