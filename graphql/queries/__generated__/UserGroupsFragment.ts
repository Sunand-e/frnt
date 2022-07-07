/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserGroupsFragment
// ====================================================

export interface UserGroupsFragment_groups_edges_node {
  __typename: "Group";
  id: string;
  name: string | null;
}

export interface UserGroupsFragment_groups_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface UserGroupsFragment_groups_edges {
  __typename: "UserGroupEdge";
  /**
   * The item at the end of the edge.
   */
  node: UserGroupsFragment_groups_edges_node | null;
  roles: UserGroupsFragment_groups_edges_roles[] | null;
}

export interface UserGroupsFragment_groups {
  __typename: "UserGroupConnection";
  /**
   * A list of edges.
   */
  edges: (UserGroupsFragment_groups_edges | null)[] | null;
}

export interface UserGroupsFragment {
  __typename: "User";
  groups: UserGroupsFragment_groups | null;
}
