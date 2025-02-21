/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PageInfo } from "./PageInfo";

// ====================================================
// GraphQL query operation: GetPathways
// ====================================================

export interface GetPathways_pathways_edges_node_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetPathways_pathways_edges_node_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetPathways_pathways_edges_node_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetPathways_pathways_edges_node_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetPathways_pathways_edges_node_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetPathways_pathways_edges_node_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: GetPathways_pathways_edges_node_tags_image | null;
}

export interface GetPathways_pathways_edges_node_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetPathways_pathways_edges_node_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetPathways_pathways_edges_node_children_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetPathways_pathways_edges_node_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetPathways_pathways_edges_node_children_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetPathways_pathways_edges_node_children_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: GetPathways_pathways_edges_node_children_tags_image | null;
}

export interface GetPathways_pathways_edges_node_children_sections_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetPathways_pathways_edges_node_children_sections_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetPathways_pathways_edges_node_children_sections_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetPathways_pathways_edges_node_children_sections_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetPathways_pathways_edges_node_children_sections_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetPathways_pathways_edges_node_children_sections_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: GetPathways_pathways_edges_node_children_sections_tags_image | null;
}

export interface GetPathways_pathways_edges_node_children_sections_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetPathways_pathways_edges_node_children_sections_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetPathways_pathways_edges_node_children_sections_children_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetPathways_pathways_edges_node_children_sections_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetPathways_pathways_edges_node_children_sections_children_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface GetPathways_pathways_edges_node_children_sections_children_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: GetPathways_pathways_edges_node_children_sections_children_tags_image | null;
}

export interface GetPathways_pathways_edges_node_children_sections_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetPathways_pathways_edges_node_children_sections_children_image | null;
  id: string;
  icon: GetPathways_pathways_edges_node_children_sections_children_icon | null;
  itemType: string;
  mediaItem: GetPathways_pathways_edges_node_children_sections_children_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetPathways_pathways_edges_node_children_sections_children_users | null;
  tags: GetPathways_pathways_edges_node_children_sections_children_tags[] | null;
  _deleted: boolean;
}

export interface GetPathways_pathways_edges_node_children_sections {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetPathways_pathways_edges_node_children_sections_image | null;
  id: string;
  icon: GetPathways_pathways_edges_node_children_sections_icon | null;
  itemType: string;
  mediaItem: GetPathways_pathways_edges_node_children_sections_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetPathways_pathways_edges_node_children_sections_users | null;
  tags: GetPathways_pathways_edges_node_children_sections_tags[] | null;
  _deleted: boolean;
  children: GetPathways_pathways_edges_node_children_sections_children[] | null;
}

export interface GetPathways_pathways_edges_node_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetPathways_pathways_edges_node_children_image | null;
  id: string;
  icon: GetPathways_pathways_edges_node_children_icon | null;
  itemType: string;
  mediaItem: GetPathways_pathways_edges_node_children_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetPathways_pathways_edges_node_children_users | null;
  tags: GetPathways_pathways_edges_node_children_tags[] | null;
  _deleted: boolean;
  sections: GetPathways_pathways_edges_node_children_sections[] | null;
}

export interface GetPathways_pathways_edges_node {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetPathways_pathways_edges_node_image | null;
  id: string;
  icon: GetPathways_pathways_edges_node_icon | null;
  itemType: string;
  mediaItem: GetPathways_pathways_edges_node_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetPathways_pathways_edges_node_users | null;
  tags: GetPathways_pathways_edges_node_tags[] | null;
  _deleted: boolean;
  children: GetPathways_pathways_edges_node_children[] | null;
}

export interface GetPathways_pathways_edges {
  __typename: "UserContentEdge";
  /**
   * The item at the end of the edge.
   */
  node: GetPathways_pathways_edges_node | null;
}

export interface GetPathways_pathways {
  __typename: "UserContentConnection";
  /**
   * A list of edges.
   */
  edges: (GetPathways_pathways_edges | null)[] | null;
  pageInfo: (PageInfo | null) | null;
}

export interface GetPathways {
  /**
   * Get list of all pathways
   */
  pathways: GetPathways_pathways;
}
