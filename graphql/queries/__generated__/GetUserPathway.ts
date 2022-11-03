/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserPathway
// ====================================================

export interface GetUserPathway_user_pathways_edges_node_mediaItem {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetUserPathway_user_pathways_edges_node_children {
  __typename: "ContentItem";
  id: string;
}

export interface GetUserPathway_user_pathways_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  content: any | null;
  contentType: string | null;
  itemType: string;
  mediaItem: GetUserPathway_user_pathways_edges_node_mediaItem | null;
  children: GetUserPathway_user_pathways_edges_node_children[] | null;
}

export interface GetUserPathway_user_pathways_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUserPathway_user_pathways_edges_groups_edges_node {
  __typename: "Group";
  id: string;
  name: string | null;
}

export interface GetUserPathway_user_pathways_edges_groups_edges {
  __typename: "UserGroupEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserPathway_user_pathways_edges_groups_edges_node | null;
}

export interface GetUserPathway_user_pathways_edges_groups {
  __typename: "UserGroupConnection";
  /**
   * A list of edges.
   */
  edges: (GetUserPathway_user_pathways_edges_groups_edges | null)[] | null;
}

export interface GetUserPathway_user_pathways_edges {
  __typename: "UserContentEdge";
  userId: string | null;
  /**
   * The item at the end of the edge.
   */
  node: GetUserPathway_user_pathways_edges_node | null;
  roles: GetUserPathway_user_pathways_edges_roles[] | null;
  groups: GetUserPathway_user_pathways_edges_groups | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUserPathway_user_pathways {
  __typename: "UserContentConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GetUserPathway_user_pathways_edges | null)[] | null;
}

export interface GetUserPathway_user_courses_edges_node_mediaItem {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetUserPathway_user_courses_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  content: any | null;
  contentType: string | null;
  itemType: string;
  mediaItem: GetUserPathway_user_courses_edges_node_mediaItem | null;
}

export interface GetUserPathway_user_courses_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUserPathway_user_courses_edges_groups_edges_node {
  __typename: "Group";
  id: string;
  name: string | null;
}

export interface GetUserPathway_user_courses_edges_groups_edges {
  __typename: "UserGroupEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserPathway_user_courses_edges_groups_edges_node | null;
}

export interface GetUserPathway_user_courses_edges_groups {
  __typename: "UserGroupConnection";
  /**
   * A list of edges.
   */
  edges: (GetUserPathway_user_courses_edges_groups_edges | null)[] | null;
}

export interface GetUserPathway_user_courses_edges {
  __typename: "UserContentEdge";
  userId: string | null;
  /**
   * The item at the end of the edge.
   */
  node: GetUserPathway_user_courses_edges_node | null;
  roles: GetUserPathway_user_courses_edges_roles[] | null;
  groups: GetUserPathway_user_courses_edges_groups | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUserPathway_user_courses {
  __typename: "UserContentConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GetUserPathway_user_courses_edges | null)[] | null;
}

export interface GetUserPathway_user_resources_edges_node_mediaItem {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetUserPathway_user_resources_edges_node {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  content: any | null;
  contentType: string | null;
  itemType: string;
  mediaItem: GetUserPathway_user_resources_edges_node_mediaItem | null;
}

export interface GetUserPathway_user_resources_edges_roles {
  __typename: "Role";
  id: string;
  name: string | null;
  roleType: string;
}

export interface GetUserPathway_user_resources_edges_groups_edges_node {
  __typename: "Group";
  id: string;
  name: string | null;
}

export interface GetUserPathway_user_resources_edges_groups_edges {
  __typename: "UserGroupEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetUserPathway_user_resources_edges_groups_edges_node | null;
}

export interface GetUserPathway_user_resources_edges_groups {
  __typename: "UserGroupConnection";
  /**
   * A list of edges.
   */
  edges: (GetUserPathway_user_resources_edges_groups_edges | null)[] | null;
}

export interface GetUserPathway_user_resources_edges {
  __typename: "UserContentEdge";
  userId: string | null;
  /**
   * The item at the end of the edge.
   */
  node: GetUserPathway_user_resources_edges_node | null;
  roles: GetUserPathway_user_resources_edges_roles[] | null;
  groups: GetUserPathway_user_resources_edges_groups | null;
  status: string | null;
  lastVisited: any | null;
  firstVisited: any | null;
  createdAt: any | null;
  updatedAt: any | null;
  score: number | null;
  visits: number | null;
  completed: boolean | null;
}

export interface GetUserPathway_user_resources {
  __typename: "UserContentConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (GetUserPathway_user_resources_edges | null)[] | null;
}

export interface GetUserPathway_user {
  __typename: "User";
  id: string;
  pathways: GetUserPathway_user_pathways | null;
  courses: GetUserPathway_user_courses | null;
  resources: GetUserPathway_user_resources | null;
}

export interface GetUserPathway {
  /**
   * Get an user based on id
   */
  user: GetUserPathway_user;
}

export interface GetUserPathwayVariables {
  courseResourceFilter?: any | null;
  pathwayFilter?: any | null;
}
