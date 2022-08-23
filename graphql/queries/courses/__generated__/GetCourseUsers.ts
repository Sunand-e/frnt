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

export interface GetCourseUsers_course_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetCourseUsers_course_users_edges_node_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetCourseUsers_course_users_edges_node {
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
  roles: GetCourseUsers_course_users_edges_node_roles[] | null;
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
  createdAt: any | null;
  updatedAt: any | null;
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

export interface GetCourseUsers_course_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetCourseUsers_course_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetCourseUsers_course_tags_image | null;
  id: string;
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

export interface GetCourseUsers_course_sections_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetCourseUsers_course_sections_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetCourseUsers_course_sections_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetCourseUsers_course_sections_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetCourseUsers_course_sections_tags_image | null;
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

export interface GetCourseUsers_course_sections_children_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetCourseUsers_course_sections_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetCourseUsers_course_sections_children_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetCourseUsers_course_sections_children_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetCourseUsers_course_sections_children_tags_image | null;
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
  mediaItem: GetCourseUsers_course_sections_children_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCourseUsers_course_sections_children_users | null;
  tags: GetCourseUsers_course_sections_children_tags[] | null;
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
  mediaItem: GetCourseUsers_course_sections_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCourseUsers_course_sections_users | null;
  tags: GetCourseUsers_course_sections_tags[] | null;
  _deleted: boolean;
  children: GetCourseUsers_course_sections_children[] | null;
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
  mediaItem: GetCourseUsers_course_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCourseUsers_course_users | null;
  tags: GetCourseUsers_course_tags[] | null;
  _deleted: boolean;
  sections: GetCourseUsers_course_sections[] | null;
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
