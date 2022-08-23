/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLibraryItems
// ====================================================

export interface GetLibraryItems_libraryItems_edges_node_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetLibraryItems_libraryItems_edges_node_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetLibraryItems_libraryItems_edges_node_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetLibraryItems_libraryItems_edges_node_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetLibraryItems_libraryItems_edges_node_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetLibraryItems_libraryItems_edges_node_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetLibraryItems_libraryItems_edges_node_tags_image | null;
}

export interface GetLibraryItems_libraryItems_edges_node {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetLibraryItems_libraryItems_edges_node_image | null;
  id: string;
  icon: GetLibraryItems_libraryItems_edges_node_icon | null;
  itemType: string;
  mediaItem: GetLibraryItems_libraryItems_edges_node_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetLibraryItems_libraryItems_edges_node_users | null;
  tags: GetLibraryItems_libraryItems_edges_node_tags[] | null;
  _deleted: boolean;
}

export interface GetLibraryItems_libraryItems_edges {
  __typename: "ContentItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetLibraryItems_libraryItems_edges_node | null;
}

export interface GetLibraryItems_libraryItems {
  __typename: "ContentItemConnection";
  /**
   * A list of edges.
   */
  edges: (GetLibraryItems_libraryItems_edges | null)[] | null;
}

export interface GetLibraryItems {
  /**
   * Get list of all library_items
   */
  libraryItems: GetLibraryItems_libraryItems;
}
