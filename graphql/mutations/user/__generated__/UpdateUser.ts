/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUser
// ====================================================

export interface UpdateUser_updateUser_user_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface UpdateUser_updateUser_user_courses_edges_node {
  __typename: "ContentItem";
  id: string;
}

export interface UpdateUser_updateUser_user_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: UpdateUser_updateUser_user_courses_edges_node | null;
}

export interface UpdateUser_updateUser_user_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (UpdateUser_updateUser_user_courses_edges | null)[] | null;
}

export interface UpdateUser_updateUser_user {
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
  roles: UpdateUser_updateUser_user_roles[] | null;
  courses: UpdateUser_updateUser_user_courses | null;
}

export interface UpdateUser_updateUser {
  __typename: "UpdateUserPayload";
  user: UpdateUser_updateUser_user;
}

export interface UpdateUser {
  updateUser: UpdateUser_updateUser | null;
}

export interface UpdateUserVariables {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  userType?: string | null;
  status?: string | null;
}
