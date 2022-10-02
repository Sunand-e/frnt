/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserCourseStructure
// ====================================================

export interface GetUserCourseStructure_user_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUserCourseStructure_user_courses_edges_node_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface GetUserCourseStructure_user_courses_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  tags: GetUserCourseStructure_user_courses_edges_node_tags[] | null;
}

export interface GetUserCourseStructure_user_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserCourseStructure_user_courses_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUserCourseStructure_user_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetUserCourseStructure_user_courses_edges | null)[] | null;
  totalCount: number;
}

export interface GetUserCourseStructure_user_sections_edges_node_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface GetUserCourseStructure_user_sections_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  tags: GetUserCourseStructure_user_sections_edges_node_tags[] | null;
}

export interface GetUserCourseStructure_user_sections_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserCourseStructure_user_sections_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUserCourseStructure_user_sections {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetUserCourseStructure_user_sections_edges | null)[] | null;
  totalCount: number;
}

export interface GetUserCourseStructure_user_lessons_edges_node_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface GetUserCourseStructure_user_lessons_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  tags: GetUserCourseStructure_user_lessons_edges_node_tags[] | null;
}

export interface GetUserCourseStructure_user_lessons_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserCourseStructure_user_lessons_edges_node | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUserCourseStructure_user_lessons {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetUserCourseStructure_user_lessons_edges | null)[] | null;
  totalCount: number;
}

export interface GetUserCourseStructure_user {
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
  profileImageUrl: string | null;
  roles: GetUserCourseStructure_user_roles[] | null;
  courses: GetUserCourseStructure_user_courses | null;
  sections: GetUserCourseStructure_user_sections | null;
  lessons: GetUserCourseStructure_user_lessons | null;
}

export interface GetUserCourseStructure {
  /**
   * Get an user based on id
   */
  user: GetUserCourseStructure_user;
}

export interface GetUserCourseStructureVariables {
  id?: string | null;
}
