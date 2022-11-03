/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserCourses
// ====================================================

export interface GetUserCourses_user_courses_edges_node_mediaItem {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetUserCourses_user_courses_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  content: any | null;
  contentType: string | null;
  itemType: string;
  mediaItem: GetUserCourses_user_courses_edges_node_mediaItem | null;
}

export interface GetUserCourses_user_courses_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUserCourses_user_courses_edges_groups_edges_node {
  __typename: "Group";
  id: string;
  name: string | null;
}

export interface GetUserCourses_user_courses_edges_groups_edges {
  __typename: "UserGroupEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserCourses_user_courses_edges_groups_edges_node | null;
}

export interface GetUserCourses_user_courses_edges_groups {
  __typename: "UserGroupConnection";
  /**
   * A list of edges.
   */
  edges: (GetUserCourses_user_courses_edges_groups_edges | null)[] | null;
}

export interface GetUserCourses_user_courses_edges {
  __typename: "UserContentEdge";
  userId: string | null;
  /**
   * The item at the end of the edge.
   */
  node: GetUserCourses_user_courses_edges_node | null;
  roles: GetUserCourses_user_courses_edges_roles[] | null;
  groups: GetUserCourses_user_courses_edges_groups | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUserCourses_user_courses {
  __typename: "UserContentConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GetUserCourses_user_courses_edges | null)[] | null;
}

export interface GetUserCourses_user {
  __typename: "User";
  courses: GetUserCourses_user_courses | null;
}

export interface GetUserCourses {
  /**
   * Get an user based on id
   */
  user: GetUserCourses_user;
}

export interface GetUserCoursesVariables {
  id?: string | null;
}
