/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserContent
// ====================================================

export interface GetUserContent_user {
  __typename: "User";
  id: string;
}

export interface GetUserContent_courses_edges_node_mediaItem {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetUserContent_courses_edges_node_sections_lessons {
  __typename: "ContentItem";
  id: string;
}

export interface GetUserContent_courses_edges_node_sections {
  __typename: "ContentItem";
  id: string;
  lessons: GetUserContent_courses_edges_node_sections_lessons[] | null;
}

export interface GetUserContent_courses_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  content: any | null;
  contentType: string | null;
  itemType: string;
  mediaItem: GetUserContent_courses_edges_node_mediaItem | null;
  sections: GetUserContent_courses_edges_node_sections[] | null;
}

export interface GetUserContent_courses_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUserContent_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserContent_courses_edges_node | null;
  roles: GetUserContent_courses_edges_roles[] | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUserContent_courses {
  __typename: "UserContentConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GetUserContent_courses_edges | null)[] | null;
}

export interface GetUserContent_pathways_edges_node_mediaItem {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetUserContent_pathways_edges_node_children {
  __typename: "ContentItem";
  id: string;
}

export interface GetUserContent_pathways_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  content: any | null;
  contentType: string | null;
  itemType: string;
  mediaItem: GetUserContent_pathways_edges_node_mediaItem | null;
  children: GetUserContent_pathways_edges_node_children[] | null;
}

export interface GetUserContent_pathways_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUserContent_pathways_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserContent_pathways_edges_node | null;
  roles: GetUserContent_pathways_edges_roles[] | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUserContent_pathways {
  __typename: "UserContentConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GetUserContent_pathways_edges | null)[] | null;
}

export interface GetUserContent_sections_edges_node_mediaItem {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetUserContent_sections_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  content: any | null;
  contentType: string | null;
  itemType: string;
  mediaItem: GetUserContent_sections_edges_node_mediaItem | null;
}

export interface GetUserContent_sections_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUserContent_sections_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserContent_sections_edges_node | null;
  roles: GetUserContent_sections_edges_roles[] | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUserContent_sections {
  __typename: "UserContentConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GetUserContent_sections_edges | null)[] | null;
}

export interface GetUserContent_lessons_edges_node_mediaItem {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetUserContent_lessons_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  content: any | null;
  contentType: string | null;
  itemType: string;
  mediaItem: GetUserContent_lessons_edges_node_mediaItem | null;
}

export interface GetUserContent_lessons_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUserContent_lessons_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserContent_lessons_edges_node | null;
  roles: GetUserContent_lessons_edges_roles[] | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUserContent_lessons {
  __typename: "UserContentConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GetUserContent_lessons_edges | null)[] | null;
}

export interface GetUserContent {
  /**
   * Get an user based on id
   */
  user: GetUserContent_user;
  /**
   * Get list of all courses
   */
  courses: GetUserContent_courses;
  /**
   * Get list of all pathways
   */
  pathways: GetUserContent_pathways;
  /**
   * Get list of all sections
   */
  sections: GetUserContent_sections;
  /**
   * Get list of all lessons
   */
  lessons: GetUserContent_lessons;
}

export interface GetUserContentVariables {
  courseFilter?: any | null;
  lessonSectionFilter?: any | null;
}
