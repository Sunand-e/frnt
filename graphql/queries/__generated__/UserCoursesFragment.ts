/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserCoursesFragment
// ====================================================

export interface UserCoursesFragment_courses_edges_node_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UserCoursesFragment_courses_edges_node_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface UserCoursesFragment_courses_edges_node_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface UserCoursesFragment_courses_edges_node_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface UserCoursesFragment_courses_edges_node_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface UserCoursesFragment_courses_edges_node_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: UserCoursesFragment_courses_edges_node_tags_image | null;
}

export interface UserCoursesFragment_courses_edges_node {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: UserCoursesFragment_courses_edges_node_image | null;
  id: string;
  icon: UserCoursesFragment_courses_edges_node_icon | null;
  itemType: string;
  mediaItem: UserCoursesFragment_courses_edges_node_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: UserCoursesFragment_courses_edges_node_users | null;
  tags: UserCoursesFragment_courses_edges_node_tags[] | null;
  _deleted: boolean;
}

export interface UserCoursesFragment_courses_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface UserCoursesFragment_courses_edges_groups_edges_node {
  __typename: "Group";
  id: string;
  name: string | null;
}

export interface UserCoursesFragment_courses_edges_groups_edges {
  __typename: "UserGroupEdge";
  /**
   * The item at the end of the edge.
   */
  node: UserCoursesFragment_courses_edges_groups_edges_node | null;
}

export interface UserCoursesFragment_courses_edges_groups {
  __typename: "UserGroupConnection";
  /**
   * A list of edges.
   */
  edges: (UserCoursesFragment_courses_edges_groups_edges | null)[] | null;
}

export interface UserCoursesFragment_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: UserCoursesFragment_courses_edges_node | null;
  roles: UserCoursesFragment_courses_edges_roles[] | null;
  groups: UserCoursesFragment_courses_edges_groups | null;
  lastVisited: any | null;
  completed: boolean | null;
  score: number | null;
  status: string | null;
  visits: number | null;
}

export interface UserCoursesFragment_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (UserCoursesFragment_courses_edges | null)[] | null;
}

export interface UserCoursesFragment {
  __typename: "Query";
  /**
   * Get list of all courses
   */
  courses: UserCoursesFragment_courses;
}
