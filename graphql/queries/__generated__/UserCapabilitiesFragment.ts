/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserCapabilitiesFragment
// ====================================================

export interface UserCapabilitiesFragment_roles_capabilities {
  __typename: "Capability";
  id: string;
  name: string | null;
}

export interface UserCapabilitiesFragment_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
  capabilities: UserCapabilitiesFragment_roles_capabilities[] | null;
}

export interface UserCapabilitiesFragment_courses_edges_roles_capabilities {
  __typename: "Capability";
  id: string;
  name: string | null;
}

export interface UserCapabilitiesFragment_courses_edges_roles {
  __typename: "Role";
  id: string;
  capabilities: UserCapabilitiesFragment_courses_edges_roles_capabilities[] | null;
}

export interface UserCapabilitiesFragment_courses_edges {
  __typename: "UserContentEdge";
  roles: UserCapabilitiesFragment_courses_edges_roles[] | null;
}

export interface UserCapabilitiesFragment_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (UserCapabilitiesFragment_courses_edges | null)[] | null;
}

export interface UserCapabilitiesFragment_groups_edges_roles_capabilities {
  __typename: "Capability";
  id: string;
  name: string | null;
}

export interface UserCapabilitiesFragment_groups_edges_roles {
  __typename: "Role";
  id: string;
  capabilities: UserCapabilitiesFragment_groups_edges_roles_capabilities[] | null;
}

export interface UserCapabilitiesFragment_groups_edges {
  __typename: "UserGroupEdge";
  roles: UserCapabilitiesFragment_groups_edges_roles[] | null;
}

export interface UserCapabilitiesFragment_groups {
  __typename: "UserGroupConnection";
  /**
   * A list of edges.
   */
  edges: (UserCapabilitiesFragment_groups_edges | null)[] | null;
}

export interface UserCapabilitiesFragment {
  __typename: "User";
  roles: UserCapabilitiesFragment_roles[] | null;
  courses: UserCapabilitiesFragment_courses | null;
  groups: UserCapabilitiesFragment_groups | null;
}
