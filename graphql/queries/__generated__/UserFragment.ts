/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserFragment
// ====================================================

export interface UserFragment_roles {
  __typename: "Role";
  id: string;
  name: string | null;
}

export interface UserFragment_courses_edges_node {
  __typename: "ContentItem";
  id: string;
}

export interface UserFragment_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: UserFragment_courses_edges_node | null;
}

export interface UserFragment_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (UserFragment_courses_edges | null)[] | null;
}

export interface UserFragment {
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
  roles: UserFragment_roles[] | null;
  courses: UserFragment_courses | null;
}
