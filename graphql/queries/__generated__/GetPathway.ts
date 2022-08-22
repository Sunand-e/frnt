/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPathway
// ====================================================

export interface GetPathway_pathway_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetPathway_pathway_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetPathway_pathway_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetPathway_pathway_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetPathway_pathway_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetPathway_pathway_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetPathway_pathway_tags_image | null;
  id: string;
}

export interface GetPathway_pathway_courses_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetPathway_pathway_courses_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetPathway_pathway_courses_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetPathway_pathway_courses_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetPathway_pathway_courses_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetPathway_pathway_courses_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetPathway_pathway_courses_tags_image | null;
  id: string;
}

export interface GetPathway_pathway_courses_sections_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetPathway_pathway_courses_sections_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetPathway_pathway_courses_sections_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetPathway_pathway_courses_sections_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetPathway_pathway_courses_sections_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetPathway_pathway_courses_sections_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetPathway_pathway_courses_sections_tags_image | null;
}

export interface GetPathway_pathway_courses_sections_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetPathway_pathway_courses_sections_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetPathway_pathway_courses_sections_children_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetPathway_pathway_courses_sections_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetPathway_pathway_courses_sections_children_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetPathway_pathway_courses_sections_children_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetPathway_pathway_courses_sections_children_tags_image | null;
}

export interface GetPathway_pathway_courses_sections_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetPathway_pathway_courses_sections_children_image | null;
  id: string;
  icon: GetPathway_pathway_courses_sections_children_icon | null;
  itemType: string;
  mediaItem: GetPathway_pathway_courses_sections_children_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetPathway_pathway_courses_sections_children_users | null;
  tags: GetPathway_pathway_courses_sections_children_tags[] | null;
  _deleted: boolean;
}

export interface GetPathway_pathway_courses_sections {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetPathway_pathway_courses_sections_image | null;
  id: string;
  icon: GetPathway_pathway_courses_sections_icon | null;
  itemType: string;
  mediaItem: GetPathway_pathway_courses_sections_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetPathway_pathway_courses_sections_users | null;
  tags: GetPathway_pathway_courses_sections_tags[] | null;
  _deleted: boolean;
  children: GetPathway_pathway_courses_sections_children[] | null;
}

export interface GetPathway_pathway_courses {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetPathway_pathway_courses_image | null;
  id: string;
  icon: GetPathway_pathway_courses_icon | null;
  itemType: string;
  mediaItem: GetPathway_pathway_courses_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetPathway_pathway_courses_users | null;
  tags: GetPathway_pathway_courses_tags[] | null;
  _deleted: boolean;
  sections: GetPathway_pathway_courses_sections[] | null;
}

export interface GetPathway_pathway {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetPathway_pathway_image | null;
  id: string;
  icon: GetPathway_pathway_icon | null;
  itemType: string;
  mediaItem: GetPathway_pathway_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetPathway_pathway_users | null;
  tags: GetPathway_pathway_tags[] | null;
  _deleted: boolean;
  courses: GetPathway_pathway_courses[] | null;
}

export interface GetPathway {
  /**
   * Get an pathways based on your conditions or based on id
   */
  pathway: GetPathway_pathway;
}

export interface GetPathwayVariables {
  id: string;
}
