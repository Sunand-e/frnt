/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateUserTenantRoles
// ====================================================

export interface UpdateUserTenantRoles_updateUserTenantRoles_user_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface UpdateUserTenantRoles_updateUserTenantRoles_user_courses_edges_node {
  __typename: "ContentItem";
  id: string;
}

export interface UpdateUserTenantRoles_updateUserTenantRoles_user_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: UpdateUserTenantRoles_updateUserTenantRoles_user_courses_edges_node | null;
}

export interface UpdateUserTenantRoles_updateUserTenantRoles_user_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (UpdateUserTenantRoles_updateUserTenantRoles_user_courses_edges | null)[] | null;
}

export interface UpdateUserTenantRoles_updateUserTenantRoles_user {
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
  roles: UpdateUserTenantRoles_updateUserTenantRoles_user_roles[] | null;
  courses: UpdateUserTenantRoles_updateUserTenantRoles_user_courses | null;
}

export interface UpdateUserTenantRoles_updateUserTenantRoles {
  __typename: "UpdateUserTenantRolesPayload";
  user: UpdateUserTenantRoles_updateUserTenantRoles_user;
}

export interface UpdateUserTenantRoles {
  updateUserTenantRoles: UpdateUserTenantRoles_updateUserTenantRoles | null;
}

export interface UpdateUserTenantRolesVariables {
  userId: string;
  roleIds: string[];
}
