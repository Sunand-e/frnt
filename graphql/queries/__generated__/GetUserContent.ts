/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserContent
// ====================================================

export interface GetUserContent_user_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUserContent_user_courses_edges_node_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetUserContent_user_courses_edges_node_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetUserContent_user_courses_edges_node {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetUserContent_user_courses_edges_node_image | null;
  id: string;
  icon: GetUserContent_user_courses_edges_node_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  _deleted: boolean;
}

export interface GetUserContent_user_courses_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUserContent_user_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserContent_user_courses_edges_node | null;
  roles: GetUserContent_user_courses_edges_roles[] | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any;
  updatedAt: any;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUserContent_user_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetUserContent_user_courses_edges | null)[] | null;
}

export interface GetUserContent_user_groups_edges_node {
  __typename: "Group";
  id: string;
  name: string | null;
}

export interface GetUserContent_user_groups_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUserContent_user_groups_edges {
  __typename: "UserGroupEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserContent_user_groups_edges_node | null;
  roles: GetUserContent_user_groups_edges_roles[] | null;
}

export interface GetUserContent_user_groups {
  __typename: "UserGroupConnection";
  /**
   * A list of edges.
   */
  edges: (GetUserContent_user_groups_edges | null)[] | null;
}

export interface GetUserContent_user_sections_edges_node {
  __typename: "ContentItem";
  id: string;
}

export interface GetUserContent_user_sections_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserContent_user_sections_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any;
  updatedAt: any;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUserContent_user_sections {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetUserContent_user_sections_edges | null)[] | null;
}

export interface GetUserContent_user_lessons_edges_node {
  __typename: "ContentItem";
  id: string;
}

export interface GetUserContent_user_lessons_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserContent_user_lessons_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any;
  updatedAt: any;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUserContent_user_lessons {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetUserContent_user_lessons_edges | null)[] | null;
}

export interface GetUserContent_user {
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
  roles: GetUserContent_user_roles[] | null;
  courses: GetUserContent_user_courses | null;
  groups: GetUserContent_user_groups | null;
  sections: GetUserContent_user_sections | null;
  lessons: GetUserContent_user_lessons | null;
}

export interface GetUserContent {
  /**
   * Get an user based on id
   */
  user: GetUserContent_user;
}

export interface GetUserContentVariables {
  id: string;
}
