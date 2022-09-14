/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSection
// ====================================================

export interface GetSection_section_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetSection_section_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetSection_section_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetSection_section_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetSection_section_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetSection_section_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetSection_section_tags_image | null;
}

export interface GetSection_section_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetSection_section_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetSection_section_children_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetSection_section_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetSection_section_children_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetSection_section_children_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetSection_section_children_tags_image | null;
}

export interface GetSection_section_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetSection_section_children_image | null;
  id: string;
  icon: GetSection_section_children_icon | null;
  itemType: string;
  mediaItem: GetSection_section_children_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetSection_section_children_users | null;
  tags: GetSection_section_children_tags[] | null;
  _deleted: boolean;
}

export interface GetSection_section {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: GetSection_section_image | null;
  id: string;
  icon: GetSection_section_icon | null;
  itemType: string;
  mediaItem: GetSection_section_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetSection_section_users | null;
  tags: GetSection_section_tags[] | null;
  _deleted: boolean;
  children: GetSection_section_children[] | null;
}

export interface GetSection {
  /**
   * Get an sections based on your conditions or based on id
   */
  section: GetSection_section;
}

export interface GetSectionVariables {
  id: string;
}
