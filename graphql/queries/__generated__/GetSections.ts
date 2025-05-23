/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSections
// ====================================================

export interface GetSections_sections_nodes_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetSections_sections_nodes_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetSections_sections_nodes_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetSections_sections_nodes_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetSections_sections_nodes_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetSections_sections_nodes_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: GetSections_sections_nodes_tags_image | null;
}

export interface GetSections_sections_nodes_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetSections_sections_nodes_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetSections_sections_nodes_children_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetSections_sections_nodes_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetSections_sections_nodes_children_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetSections_sections_nodes_children_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: GetSections_sections_nodes_children_tags_image | null;
}

export interface GetSections_sections_nodes_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetSections_sections_nodes_children_image | null;
  id: string;
  icon: GetSections_sections_nodes_children_icon | null;
  itemType: string;
  mediaItem: GetSections_sections_nodes_children_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetSections_sections_nodes_children_users | null;
  tags: GetSections_sections_nodes_children_tags[] | null;
  _deleted: boolean;
}

export interface GetSections_sections_nodes {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetSections_sections_nodes_image | null;
  id: string;
  icon: GetSections_sections_nodes_icon | null;
  itemType: string;
  mediaItem: GetSections_sections_nodes_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetSections_sections_nodes_users | null;
  tags: GetSections_sections_nodes_tags[] | null;
  _deleted: boolean;
  children: GetSections_sections_nodes_children[] | null;
}

export interface GetSections_sections {
  __typename: "UserContentConnection";
  /**
   * A list of nodes.
   */
  nodes: (GetSections_sections_nodes | null)[] | null;
}

export interface GetSections {
  /**
   * Get list of all sections
   */
  sections: GetSections_sections;
}
