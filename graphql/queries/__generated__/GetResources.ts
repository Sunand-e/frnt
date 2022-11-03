/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetResources
// ====================================================

export interface GetResources_resources_edges_node_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetResources_resources_edges_node_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetResources_resources_edges_node_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetResources_resources_edges_node_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetResources_resources_edges_node_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetResources_resources_edges_node_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: GetResources_resources_edges_node_tags_image | null;
}

export interface GetResources_resources_edges_node {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetResources_resources_edges_node_image | null;
  id: string;
  icon: GetResources_resources_edges_node_icon | null;
  itemType: string;
  mediaItem: GetResources_resources_edges_node_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetResources_resources_edges_node_users | null;
  tags: GetResources_resources_edges_node_tags[] | null;
  _deleted: boolean;
}

export interface GetResources_resources_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetResources_resources_edges_node | null;
}

export interface GetResources_resources {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetResources_resources_edges | null)[] | null;
}

export interface GetResources {
  /**
   * Get list of all resources
   */
  resources: GetResources_resources;
}
