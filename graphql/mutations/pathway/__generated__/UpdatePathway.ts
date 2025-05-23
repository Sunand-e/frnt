/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePathway
// ====================================================

export interface UpdatePathway_updatePathway_pathway_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UpdatePathway_updatePathway_pathway_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface UpdatePathway_updatePathway_pathway_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface UpdatePathway_updatePathway_pathway_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface UpdatePathway_updatePathway_pathway_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface UpdatePathway_updatePathway_pathway_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: UpdatePathway_updatePathway_pathway_tags_image | null;
}

export interface UpdatePathway_updatePathway_pathway_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UpdatePathway_updatePathway_pathway_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface UpdatePathway_updatePathway_pathway_children_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface UpdatePathway_updatePathway_pathway_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface UpdatePathway_updatePathway_pathway_children_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface UpdatePathway_updatePathway_pathway_children_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: UpdatePathway_updatePathway_pathway_children_tags_image | null;
}

export interface UpdatePathway_updatePathway_pathway_children_sections_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UpdatePathway_updatePathway_pathway_children_sections_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface UpdatePathway_updatePathway_pathway_children_sections_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface UpdatePathway_updatePathway_pathway_children_sections_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface UpdatePathway_updatePathway_pathway_children_sections_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface UpdatePathway_updatePathway_pathway_children_sections_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: UpdatePathway_updatePathway_pathway_children_sections_tags_image | null;
}

export interface UpdatePathway_updatePathway_pathway_children_sections_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UpdatePathway_updatePathway_pathway_children_sections_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface UpdatePathway_updatePathway_pathway_children_sections_children_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface UpdatePathway_updatePathway_pathway_children_sections_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface UpdatePathway_updatePathway_pathway_children_sections_children_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface UpdatePathway_updatePathway_pathway_children_sections_children_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: UpdatePathway_updatePathway_pathway_children_sections_children_tags_image | null;
}

export interface UpdatePathway_updatePathway_pathway_children_sections_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: UpdatePathway_updatePathway_pathway_children_sections_children_image | null;
  id: string;
  icon: UpdatePathway_updatePathway_pathway_children_sections_children_icon | null;
  itemType: string;
  mediaItem: UpdatePathway_updatePathway_pathway_children_sections_children_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: UpdatePathway_updatePathway_pathway_children_sections_children_users | null;
  tags: UpdatePathway_updatePathway_pathway_children_sections_children_tags[] | null;
  _deleted: boolean;
}

export interface UpdatePathway_updatePathway_pathway_children_sections {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: UpdatePathway_updatePathway_pathway_children_sections_image | null;
  id: string;
  icon: UpdatePathway_updatePathway_pathway_children_sections_icon | null;
  itemType: string;
  mediaItem: UpdatePathway_updatePathway_pathway_children_sections_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: UpdatePathway_updatePathway_pathway_children_sections_users | null;
  tags: UpdatePathway_updatePathway_pathway_children_sections_tags[] | null;
  _deleted: boolean;
  children: UpdatePathway_updatePathway_pathway_children_sections_children[] | null;
}

export interface UpdatePathway_updatePathway_pathway_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: UpdatePathway_updatePathway_pathway_children_image | null;
  id: string;
  icon: UpdatePathway_updatePathway_pathway_children_icon | null;
  itemType: string;
  mediaItem: UpdatePathway_updatePathway_pathway_children_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: UpdatePathway_updatePathway_pathway_children_users | null;
  tags: UpdatePathway_updatePathway_pathway_children_tags[] | null;
  _deleted: boolean;
  sections: UpdatePathway_updatePathway_pathway_children_sections[] | null;
}

export interface UpdatePathway_updatePathway_pathway {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: UpdatePathway_updatePathway_pathway_image | null;
  id: string;
  icon: UpdatePathway_updatePathway_pathway_icon | null;
  itemType: string;
  mediaItem: UpdatePathway_updatePathway_pathway_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: UpdatePathway_updatePathway_pathway_users | null;
  tags: UpdatePathway_updatePathway_pathway_tags[] | null;
  _deleted: boolean;
  children: UpdatePathway_updatePathway_pathway_children[] | null;
}

export interface UpdatePathway_updatePathway {
  __typename: "UpdatePathwayPayload";
  pathway: UpdatePathway_updatePathway_pathway | null;
}

export interface UpdatePathway {
  updatePathway: UpdatePathway_updatePathway | null;
}

export interface UpdatePathwayVariables {
  id: string;
  title?: string | null;
  content?: any | null;
  certificateProperties?: any | null;
  settings?: any | null;
  tags?: TagInput[] | null;
  imageId?: string | null;
  imageUrl?: string | null;
  childrenIds?: any | null;
  prerequisites?: any | null;
}
