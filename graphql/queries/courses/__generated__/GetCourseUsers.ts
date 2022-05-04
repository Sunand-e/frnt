/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCourseUsers
// ====================================================

export interface GetCourseUsers_course_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetCourseUsers_course_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetCourseUsers_course_users_edges_node {
  __typename: "User";
  id: string;
}

export interface GetCourseUsers_course_users_edges {
  __typename: "ContentUserEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetCourseUsers_course_users_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any;
  updatedAt: any;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetCourseUsers_course_users {
  __typename: "ContentUserConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GetCourseUsers_course_users_edges | null)[] | null;
}

export interface GetCourseUsers_course_sections_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetCourseUsers_course_sections_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetCourseUsers_course_sections_users_edges_node {
  __typename: "User";
  id: string;
}

export interface GetCourseUsers_course_sections_users_edges {
  __typename: "ContentUserEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetCourseUsers_course_sections_users_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any;
  updatedAt: any;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetCourseUsers_course_sections_users {
  __typename: "ContentUserConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GetCourseUsers_course_sections_users_edges | null)[] | null;
}

export interface GetCourseUsers_course_sections_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetCourseUsers_course_sections_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetCourseUsers_course_sections_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetCourseUsers_course_sections_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetCourseUsers_course_sections_children_image | null;
  id: string;
  icon: GetCourseUsers_course_sections_children_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCourseUsers_course_sections_children_users | null;
  _deleted: boolean;
}

export interface GetCourseUsers_course_sections_lessons_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetCourseUsers_course_sections_lessons_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetCourseUsers_course_sections_lessons_users_edges_node {
  __typename: "User";
  id: string;
}

export interface GetCourseUsers_course_sections_lessons_users_edges {
  __typename: "ContentUserEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetCourseUsers_course_sections_lessons_users_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any;
  updatedAt: any;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetCourseUsers_course_sections_lessons_users {
  __typename: "ContentUserConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GetCourseUsers_course_sections_lessons_users_edges | null)[] | null;
}

export interface GetCourseUsers_course_sections_lessons {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetCourseUsers_course_sections_lessons_image | null;
  id: string;
  icon: GetCourseUsers_course_sections_lessons_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCourseUsers_course_sections_lessons_users | null;
  _deleted: boolean;
}

export interface GetCourseUsers_course_sections {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetCourseUsers_course_sections_image | null;
  id: string;
  icon: GetCourseUsers_course_sections_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCourseUsers_course_sections_users | null;
  _deleted: boolean;
  children: GetCourseUsers_course_sections_children[] | null;
  lessons: GetCourseUsers_course_sections_lessons[] | null;
}

export interface GetCourseUsers_course_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface GetCourseUsers_course {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetCourseUsers_course_image | null;
  id: string;
  icon: GetCourseUsers_course_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCourseUsers_course_users | null;
  _deleted: boolean;
  sections: GetCourseUsers_course_sections[] | null;
  tags: GetCourseUsers_course_tags[] | null;
}

export interface GetCourseUsers {
  /**
   * Get an courses based on your conditions or based on id
   */
  course: GetCourseUsers_course;
}

export interface GetCourseUsersVariables {
  id: string;
}
