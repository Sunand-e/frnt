/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCurrentUser
// ====================================================

export interface GetCurrentUser_user_roles_capabilities {
  __typename: "Capability";
  id: string;
  name: string | null;
}

export interface GetCurrentUser_user_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
  capabilities: GetCurrentUser_user_roles_capabilities[] | null;
}

export interface GetCurrentUser_user_groups_edges_node {
  __typename: "Group";
  id: string;
  name: string | null;
}

export interface GetCurrentUser_user_groups_edges_roles_capabilities {
  __typename: "Capability";
  id: string;
  name: string | null;
}

export interface GetCurrentUser_user_groups_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
  capabilities: GetCurrentUser_user_groups_edges_roles_capabilities[] | null;
}

export interface GetCurrentUser_user_groups_edges {
  __typename: "UserGroupEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetCurrentUser_user_groups_edges_node | null;
  roles: GetCurrentUser_user_groups_edges_roles[] | null;
}

export interface GetCurrentUser_user_groups {
  __typename: "UserGroupConnection";
  /**
   * A list of edges.
   */
  edges: (GetCurrentUser_user_groups_edges | null)[] | null;
}

export interface GetCurrentUser_user_courses_edges_roles_capabilities {
  __typename: "Capability";
  id: string;
  name: string | null;
}

export interface GetCurrentUser_user_courses_edges_roles {
  __typename: "Role";
  id: string;
  capabilities: GetCurrentUser_user_courses_edges_roles_capabilities[] | null;
}

export interface GetCurrentUser_user_courses_edges {
  __typename: "UserContentEdge";
  roles: GetCurrentUser_user_courses_edges_roles[] | null;
}

export interface GetCurrentUser_user_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetCurrentUser_user_courses_edges | null)[] | null;
}

export interface GetCurrentUser_user {
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
  roles: GetCurrentUser_user_roles[] | null;
  groups: GetCurrentUser_user_groups | null;
  courses: GetCurrentUser_user_courses | null;
}

export interface GetCurrentUser_pathways_edges_node_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetCurrentUser_pathways_edges_node_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetCurrentUser_pathways_edges_node_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetCurrentUser_pathways_edges_node_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetCurrentUser_pathways_edges_node_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetCurrentUser_pathways_edges_node_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: GetCurrentUser_pathways_edges_node_tags_image | null;
}

export interface GetCurrentUser_pathways_edges_node_children {
  __typename: "ContentItem";
  id: string;
  title: string | null;
}

export interface GetCurrentUser_pathways_edges_node {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetCurrentUser_pathways_edges_node_image | null;
  id: string;
  icon: GetCurrentUser_pathways_edges_node_icon | null;
  itemType: string;
  mediaItem: GetCurrentUser_pathways_edges_node_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCurrentUser_pathways_edges_node_users | null;
  tags: GetCurrentUser_pathways_edges_node_tags[] | null;
  _deleted: boolean;
  children: GetCurrentUser_pathways_edges_node_children[] | null;
}

export interface GetCurrentUser_pathways_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetCurrentUser_pathways_edges_groups_edges_node {
  __typename: "Group";
  id: string;
  name: string | null;
}

export interface GetCurrentUser_pathways_edges_groups_edges {
  __typename: "UserGroupEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetCurrentUser_pathways_edges_groups_edges_node | null;
}

export interface GetCurrentUser_pathways_edges_groups {
  __typename: "UserGroupConnection";
  /**
   * A list of edges.
   */
  edges: (GetCurrentUser_pathways_edges_groups_edges | null)[] | null;
}

export interface GetCurrentUser_pathways_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetCurrentUser_pathways_edges_node | null;
  roles: GetCurrentUser_pathways_edges_roles[] | null;
  groups: GetCurrentUser_pathways_edges_groups | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  completed: boolean | null;
  score: number | null;
  status: string | null;
  visits: number | null;
}

export interface GetCurrentUser_pathways {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetCurrentUser_pathways_edges | null)[] | null;
}

export interface GetCurrentUser_resources_edges_node_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetCurrentUser_resources_edges_node_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetCurrentUser_resources_edges_node_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetCurrentUser_resources_edges_node_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetCurrentUser_resources_edges_node_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetCurrentUser_resources_edges_node_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: GetCurrentUser_resources_edges_node_tags_image | null;
}

export interface GetCurrentUser_resources_edges_node {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetCurrentUser_resources_edges_node_image | null;
  id: string;
  icon: GetCurrentUser_resources_edges_node_icon | null;
  itemType: string;
  mediaItem: GetCurrentUser_resources_edges_node_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCurrentUser_resources_edges_node_users | null;
  tags: GetCurrentUser_resources_edges_node_tags[] | null;
  _deleted: boolean;
}

export interface GetCurrentUser_resources_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetCurrentUser_resources_edges_groups_edges_node {
  __typename: "Group";
  id: string;
  name: string | null;
}

export interface GetCurrentUser_resources_edges_groups_edges {
  __typename: "UserGroupEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetCurrentUser_resources_edges_groups_edges_node | null;
}

export interface GetCurrentUser_resources_edges_groups {
  __typename: "UserGroupConnection";
  /**
   * A list of edges.
   */
  edges: (GetCurrentUser_resources_edges_groups_edges | null)[] | null;
}

export interface GetCurrentUser_resources_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetCurrentUser_resources_edges_node | null;
  roles: GetCurrentUser_resources_edges_roles[] | null;
  groups: GetCurrentUser_resources_edges_groups | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  completed: boolean | null;
  score: number | null;
  status: string | null;
  visits: number | null;
}

export interface GetCurrentUser_resources {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetCurrentUser_resources_edges | null)[] | null;
}

export interface GetCurrentUser_courses_edges_node_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetCurrentUser_courses_edges_node_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetCurrentUser_courses_edges_node_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetCurrentUser_courses_edges_node_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetCurrentUser_courses_edges_node_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetCurrentUser_courses_edges_node_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: GetCurrentUser_courses_edges_node_tags_image | null;
}

export interface GetCurrentUser_courses_edges_node {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetCurrentUser_courses_edges_node_image | null;
  id: string;
  icon: GetCurrentUser_courses_edges_node_icon | null;
  itemType: string;
  mediaItem: GetCurrentUser_courses_edges_node_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetCurrentUser_courses_edges_node_users | null;
  tags: GetCurrentUser_courses_edges_node_tags[] | null;
  _deleted: boolean;
}

export interface GetCurrentUser_courses_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetCurrentUser_courses_edges_groups_edges_node {
  __typename: "Group";
  id: string;
  name: string | null;
}

export interface GetCurrentUser_courses_edges_groups_edges {
  __typename: "UserGroupEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetCurrentUser_courses_edges_groups_edges_node | null;
}

export interface GetCurrentUser_courses_edges_groups {
  __typename: "UserGroupConnection";
  /**
   * A list of edges.
   */
  edges: (GetCurrentUser_courses_edges_groups_edges | null)[] | null;
}

export interface GetCurrentUser_courses_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetCurrentUser_courses_edges_node | null;
  roles: GetCurrentUser_courses_edges_roles[] | null;
  groups: GetCurrentUser_courses_edges_groups | null;
  lastVisited: any | null;
  completed: boolean | null;
  score: number | null;
  status: string | null;
  visits: number | null;
}

export interface GetCurrentUser_courses {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetCurrentUser_courses_edges | null)[] | null;
}

export interface GetCurrentUser {
  /**
   * Get an user based on id
   */
  user: GetCurrentUser_user;
  __typename: "Query";
  /**
   * Get list of all pathways
   */
  pathways: GetCurrentUser_pathways;
  /**
   * Get list of all resources
   */
  resources: GetCurrentUser_resources;
  /**
   * Get list of all courses
   */
  courses: GetCurrentUser_courses;
}

export interface GetCurrentUserVariables {
  id?: string | null;
}
