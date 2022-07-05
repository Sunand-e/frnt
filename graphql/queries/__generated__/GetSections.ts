/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSections
// ====================================================

export interface GetSections_sections_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetSections_sections_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetSections_sections_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetSections_sections_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetSections_sections_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetSections_sections_tags_image | null;
}

export interface GetSections_sections_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetSections_sections_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetSections_sections_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetSections_sections_children_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetSections_sections_children_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetSections_sections_children_tags_image | null;
}

export interface GetSections_sections_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetSections_sections_children_image | null;
  id: string;
  icon: GetSections_sections_children_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetSections_sections_children_users | null;
  tags: GetSections_sections_children_tags[] | null;
  _deleted: boolean;
}

export interface GetSections_sections {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetSections_sections_image | null;
  id: string;
  icon: GetSections_sections_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetSections_sections_users | null;
  tags: GetSections_sections_tags[] | null;
  _deleted: boolean;
  children: GetSections_sections_children[] | null;
}

export interface GetSections {
  /**
   * Get list of all sections
   */
  sections: GetSections_sections[];
}
