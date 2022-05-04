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

export interface UpdateUserTenantRoles_updateUserTenantRoles_user_courses_edges_node_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UpdateUserTenantRoles_updateUserTenantRoles_user_courses_edges_node_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface UpdateUserTenantRoles_updateUserTenantRoles_user_courses_edges_node_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface UpdateUserTenantRoles_updateUserTenantRoles_user_courses_edges_node {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: UpdateUserTenantRoles_updateUserTenantRoles_user_courses_edges_node_image | null;
  id: string;
  icon: UpdateUserTenantRoles_updateUserTenantRoles_user_courses_edges_node_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: UpdateUserTenantRoles_updateUserTenantRoles_user_courses_edges_node_users | null;
  _deleted: boolean;
}

export interface UpdateUserTenantRoles_updateUserTenantRoles_user_courses_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface UpdateUserTenantRoles_updateUserTenantRoles_user_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: UpdateUserTenantRoles_updateUserTenantRoles_user_courses_edges_node | null;
  roles: UpdateUserTenantRoles_updateUserTenantRoles_user_courses_edges_roles[] | null;
  lastVisited: any | null;
  completed: boolean | null;
  score: number | null;
  status: string | null;
  visits: number | null;
}

export interface UpdateUserTenantRoles_updateUserTenantRoles_user_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (UpdateUserTenantRoles_updateUserTenantRoles_user_courses_edges | null)[] | null;
}

export interface UpdateUserTenantRoles_updateUserTenantRoles_user_groups_edges_node {
  __typename: "Group";
  id: string;
  name: string | null;
}

export interface UpdateUserTenantRoles_updateUserTenantRoles_user_groups_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface UpdateUserTenantRoles_updateUserTenantRoles_user_groups_edges {
  __typename: "UserGroupEdge";
  /**
   * The item at the end of the edge.
   */
  node: UpdateUserTenantRoles_updateUserTenantRoles_user_groups_edges_node | null;
  roles: UpdateUserTenantRoles_updateUserTenantRoles_user_groups_edges_roles[] | null;
}

export interface UpdateUserTenantRoles_updateUserTenantRoles_user_groups {
  __typename: "UserGroupConnection";
  /**
   * A list of edges.
   */
  edges: (UpdateUserTenantRoles_updateUserTenantRoles_user_groups_edges | null)[] | null;
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
  groups: UpdateUserTenantRoles_updateUserTenantRoles_user_groups | null;
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
