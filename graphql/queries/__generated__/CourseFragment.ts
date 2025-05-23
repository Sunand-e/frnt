/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CourseFragment
// ====================================================

export interface CourseFragment_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface CourseFragment_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface CourseFragment_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface CourseFragment_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface CourseFragment_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface CourseFragment_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: CourseFragment_tags_image | null;
}

export interface CourseFragment_sections_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface CourseFragment_sections_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface CourseFragment_sections_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface CourseFragment_sections_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface CourseFragment_sections_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface CourseFragment_sections_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: CourseFragment_sections_tags_image | null;
}

export interface CourseFragment_sections_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface CourseFragment_sections_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface CourseFragment_sections_children_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface CourseFragment_sections_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface CourseFragment_sections_children_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface CourseFragment_sections_children_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: CourseFragment_sections_children_tags_image | null;
}

export interface CourseFragment_sections_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: CourseFragment_sections_children_image | null;
  id: string;
  icon: CourseFragment_sections_children_icon | null;
  itemType: string;
  mediaItem: CourseFragment_sections_children_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: CourseFragment_sections_children_users | null;
  tags: CourseFragment_sections_children_tags[] | null;
  _deleted: boolean;
}

export interface CourseFragment_sections {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: CourseFragment_sections_image | null;
  id: string;
  icon: CourseFragment_sections_icon | null;
  itemType: string;
  mediaItem: CourseFragment_sections_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: CourseFragment_sections_users | null;
  tags: CourseFragment_sections_tags[] | null;
  _deleted: boolean;
  children: CourseFragment_sections_children[] | null;
}

export interface CourseFragment {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: CourseFragment_image | null;
  id: string;
  icon: CourseFragment_icon | null;
  itemType: string;
  mediaItem: CourseFragment_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: CourseFragment_users | null;
  tags: CourseFragment_tags[] | null;
  _deleted: boolean;
  sections: CourseFragment_sections[] | null;
}
