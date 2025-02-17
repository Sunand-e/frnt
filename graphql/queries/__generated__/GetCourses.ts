/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCourses
// ====================================================

export interface GetCourses_courses_edges_node_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetCourses_courses_edges_node_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetCourses_courses_edges_node_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetCourses_courses_edges_node_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetCourses_courses_edges_node_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetCourses_courses_edges_node_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: GetCourses_courses_edges_node_tags_image | null;
}

export interface GetCourses_courses_edges_node_sections_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetCourses_courses_edges_node_sections_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetCourses_courses_edges_node_sections_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetCourses_courses_edges_node_sections_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetCourses_courses_edges_node_sections_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetCourses_courses_edges_node_sections_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: GetCourses_courses_edges_node_sections_tags_image | null;
}

export interface GetCourses_courses_edges_node_sections_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetCourses_courses_edges_node_sections_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetCourses_courses_edges_node_sections_children_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetCourses_courses_edges_node_sections_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetCourses_courses_edges_node_sections_children_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetCourses_courses_edges_node_sections_children_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: GetCourses_courses_edges_node_sections_children_tags_image | null;
}

export interface GetCourses_courses_edges_node_sections_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetCourses_courses_edges_node_sections_children_image | null;
  id: string;
  icon: GetCourses_courses_edges_node_sections_children_icon | null;
  itemType: string;
  mediaItem: GetCourses_courses_edges_node_sections_children_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCourses_courses_edges_node_sections_children_users | null;
  tags: GetCourses_courses_edges_node_sections_children_tags[] | null;
  _deleted: boolean;
}

export interface GetCourses_courses_edges_node_sections {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetCourses_courses_edges_node_sections_image | null;
  id: string;
  icon: GetCourses_courses_edges_node_sections_icon | null;
  itemType: string;
  mediaItem: GetCourses_courses_edges_node_sections_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCourses_courses_edges_node_sections_users | null;
  tags: GetCourses_courses_edges_node_sections_tags[] | null;
  _deleted: boolean;
  children: GetCourses_courses_edges_node_sections_children[] | null;
}

export interface GetCourses_courses_edges_node {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetCourses_courses_edges_node_image | null;
  id: string;
  icon: GetCourses_courses_edges_node_icon | null;
  itemType: string;
  mediaItem: GetCourses_courses_edges_node_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCourses_courses_edges_node_users | null;
  tags: GetCourses_courses_edges_node_tags[] | null;
  _deleted: boolean;
  sections: GetCourses_courses_edges_node_sections[] | null;
}

export interface GetCourses_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetCourses_courses_edges_node | null;
}

export interface GetCourses_pageInfo {
  __typename: "PageInfo";
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface GetCourses_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetCourses_courses_edges | null)[] | null;
  pageInfo: (GetCourses_pageInfo | null) | null;
}

export interface GetCourses {
  /**
   * Get list of all courses
   */
  courses: GetCourses_courses;
}
