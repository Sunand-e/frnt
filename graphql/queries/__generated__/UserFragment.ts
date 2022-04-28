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
  roleType: string;
}

export interface UserFragment_courses_edges_node_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UserFragment_courses_edges_node_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface UserFragment_courses_edges_node {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: UserFragment_courses_edges_node_image | null;
  id: string;
  icon: UserFragment_courses_edges_node_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  _deleted: boolean;
}

export interface UserFragment_courses_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface UserFragment_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: UserFragment_courses_edges_node | null;
  roles: UserFragment_courses_edges_roles[] | null;
}

export interface UserFragment_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (UserFragment_courses_edges | null)[] | null;
}

export interface UserFragment_groups_edges_node {
  __typename: "Group";
  id: string;
  name: string | null;
}

export interface UserFragment_groups_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface UserFragment_groups_edges {
  __typename: "UserGroupEdge";
  /**
   * The item at the end of the edge.
   */
  node: UserFragment_groups_edges_node | null;
  roles: UserFragment_groups_edges_roles[] | null;
}

export interface UserFragment_groups {
  __typename: "UserGroupConnection";
  /**
   * A list of edges.
   */
  edges: (UserFragment_groups_edges | null)[] | null;
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
  groups: UserFragment_groups | null;
}
