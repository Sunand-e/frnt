/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateGroup
// ====================================================

export interface UpdateGroup_updateGroup_group_users_edges_node {
  __typename: "User";
  id: string;
}

export interface UpdateGroup_updateGroup_group_users_edges {
  __typename: "GroupUserEdge";
  /**
   * The item at the end of the edge.
   */
  node: UpdateGroup_updateGroup_group_users_edges_node | null;
}

export interface UpdateGroup_updateGroup_group_users {
  __typename: "GroupUserConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (UpdateGroup_updateGroup_group_users_edges | null)[] | null;
}

export interface UpdateGroup_updateGroup_group_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UpdateGroup_updateGroup_group_enrolledCourses_edges_node {
  __typename: "ContentItem";
  id: string;
}

export interface UpdateGroup_updateGroup_group_enrolledCourses_edges {
  __typename: "GroupEnrolledContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: UpdateGroup_updateGroup_group_enrolledCourses_edges_node | null;
}

export interface UpdateGroup_updateGroup_group_enrolledCourses {
  __typename: "GroupEnrolledContentConnection";
  totalCount: number;
  /**
   * A list of edges.
   */
  edges: (UpdateGroup_updateGroup_group_enrolledCourses_edges | null)[] | null;
}

export interface UpdateGroup_updateGroup_group_assignedCourses {
  __typename: "ContentItem";
  id: string;
}

export interface UpdateGroup_updateGroup_group {
  __typename: "Group";
  createdAt: any;
  id: string;
  name: string | null;
  updatedAt: any;
  users: UpdateGroup_updateGroup_group_users;
  image: UpdateGroup_updateGroup_group_image | null;
  enrolledCourses: UpdateGroup_updateGroup_group_enrolledCourses;
  assignedCourses: UpdateGroup_updateGroup_group_assignedCourses[];
  _deleted: boolean;
}

export interface UpdateGroup_updateGroup {
  __typename: "UpdateGroupPayload";
  group: UpdateGroup_updateGroup_group;
}

export interface UpdateGroup {
  updateGroup: UpdateGroup_updateGroup | null;
}

export interface UpdateGroupVariables {
  id: string;
  name?: string | null;
  parentId?: string | null;
  imageId?: string | null;
  assignedCourseIds?: string[] | null;
  enrolledCourseIds?: string[] | null;
  userIds?: string[] | null;
}
