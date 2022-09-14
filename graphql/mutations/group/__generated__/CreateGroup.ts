/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateGroup
// ====================================================

export interface CreateGroup_createGroup_group_users_edges_node {
  __typename: "User";
  id: string;
}

export interface CreateGroup_createGroup_group_users_edges {
  __typename: "GroupUserEdge";
  /**
   * The item at the end of the edge.
   */
  node: CreateGroup_createGroup_group_users_edges_node | null;
}

export interface CreateGroup_createGroup_group_users {
  __typename: "GroupUserConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (CreateGroup_createGroup_group_users_edges | null)[] | null;
}

export interface CreateGroup_createGroup_group_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface CreateGroup_createGroup_group_enrolledCourses_edges_node {
  __typename: "ContentItem";
  id: string;
}

export interface CreateGroup_createGroup_group_enrolledCourses_edges {
  __typename: "GroupEnrolledContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: CreateGroup_createGroup_group_enrolledCourses_edges_node | null;
}

export interface CreateGroup_createGroup_group_enrolledCourses {
  __typename: "GroupEnrolledContentConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (CreateGroup_createGroup_group_enrolledCourses_edges | null)[] | null;
}

export interface CreateGroup_createGroup_group_assignedCourses {
  __typename: "ContentItem";
  id: string;
}

export interface CreateGroup_createGroup_group {
  __typename: "Group";
  createdAt: any;
  id: string;
  name: string | null;
  updatedAt: any;
  users: CreateGroup_createGroup_group_users;
  image: CreateGroup_createGroup_group_image | null;
  enrolledCourses: CreateGroup_createGroup_group_enrolledCourses;
  assignedCourses: CreateGroup_createGroup_group_assignedCourses[];
  _deleted: boolean;
}

export interface CreateGroup_createGroup {
  __typename: "CreateGroupPayload";
  group: CreateGroup_createGroup_group;
}

export interface CreateGroup {
  createGroup: CreateGroup_createGroup | null;
}

export interface CreateGroupVariables {
  name: string;
  parentId?: string | null;
  assignedCourseIds?: string[] | null;
  enrolledCourseIds?: string[] | null;
  imageId?: string | null;
  userIds?: string[] | null;
}
