/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPathways
// ====================================================

export interface GetPathways_pathways_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetPathways_pathways_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetPathways_pathways_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetPathways_pathways_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetPathways_pathways_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetPathways_pathways_tags_image | null;
  id: string;
}

export interface GetPathways_pathways_courses_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetPathways_pathways_courses_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetPathways_pathways_courses_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetPathways_pathways_courses_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetPathways_pathways_courses_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetPathways_pathways_courses_tags_image | null;
  id: string;
}

export interface GetPathways_pathways_courses_sections_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetPathways_pathways_courses_sections_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetPathways_pathways_courses_sections_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetPathways_pathways_courses_sections_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetPathways_pathways_courses_sections_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetPathways_pathways_courses_sections_tags_image | null;
}

export interface GetPathways_pathways_courses_sections_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetPathways_pathways_courses_sections_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetPathways_pathways_courses_sections_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetPathways_pathways_courses_sections_children_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetPathways_pathways_courses_sections_children_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetPathways_pathways_courses_sections_children_tags_image | null;
}

export interface GetPathways_pathways_courses_sections_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetPathways_pathways_courses_sections_children_image | null;
  id: string;
  icon: GetPathways_pathways_courses_sections_children_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetPathways_pathways_courses_sections_children_users | null;
  tags: GetPathways_pathways_courses_sections_children_tags[] | null;
  _deleted: boolean;
}

export interface GetPathways_pathways_courses_sections {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetPathways_pathways_courses_sections_image | null;
  id: string;
  icon: GetPathways_pathways_courses_sections_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetPathways_pathways_courses_sections_users | null;
  tags: GetPathways_pathways_courses_sections_tags[] | null;
  _deleted: boolean;
  children: GetPathways_pathways_courses_sections_children[] | null;
}

export interface GetPathways_pathways_courses {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetPathways_pathways_courses_image | null;
  id: string;
  icon: GetPathways_pathways_courses_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetPathways_pathways_courses_users | null;
  tags: GetPathways_pathways_courses_tags[] | null;
  _deleted: boolean;
  sections: GetPathways_pathways_courses_sections[] | null;
}

export interface GetPathways_pathways {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetPathways_pathways_image | null;
  id: string;
  icon: GetPathways_pathways_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetPathways_pathways_users | null;
  tags: GetPathways_pathways_tags[] | null;
  _deleted: boolean;
  courses: GetPathways_pathways_courses[] | null;
}

export interface GetPathways {
  /**
   * Get list of all pathways
   */
  pathways: GetPathways_pathways[];
}
