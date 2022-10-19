/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PathwayFragment
// ====================================================

export interface PathwayFragment_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface PathwayFragment_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface PathwayFragment_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface PathwayFragment_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface PathwayFragment_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface PathwayFragment_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: PathwayFragment_tags_image | null;
}

export interface PathwayFragment_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface PathwayFragment_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface PathwayFragment_children_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface PathwayFragment_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface PathwayFragment_children_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface PathwayFragment_children_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: PathwayFragment_children_tags_image | null;
}

export interface PathwayFragment_children_sections_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface PathwayFragment_children_sections_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface PathwayFragment_children_sections_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface PathwayFragment_children_sections_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface PathwayFragment_children_sections_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface PathwayFragment_children_sections_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: PathwayFragment_children_sections_tags_image | null;
}

export interface PathwayFragment_children_sections_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface PathwayFragment_children_sections_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface PathwayFragment_children_sections_children_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface PathwayFragment_children_sections_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface PathwayFragment_children_sections_children_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface PathwayFragment_children_sections_children_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: PathwayFragment_children_sections_children_tags_image | null;
}

export interface PathwayFragment_children_sections_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: PathwayFragment_children_sections_children_image | null;
  id: string;
  icon: PathwayFragment_children_sections_children_icon | null;
  itemType: string;
  mediaItem: PathwayFragment_children_sections_children_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: PathwayFragment_children_sections_children_users | null;
  tags: PathwayFragment_children_sections_children_tags[] | null;
  _deleted: boolean;
}

export interface PathwayFragment_children_sections {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: PathwayFragment_children_sections_image | null;
  id: string;
  icon: PathwayFragment_children_sections_icon | null;
  itemType: string;
  mediaItem: PathwayFragment_children_sections_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: PathwayFragment_children_sections_users | null;
  tags: PathwayFragment_children_sections_tags[] | null;
  _deleted: boolean;
  children: PathwayFragment_children_sections_children[] | null;
}

export interface PathwayFragment_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: PathwayFragment_children_image | null;
  id: string;
  icon: PathwayFragment_children_icon | null;
  itemType: string;
  mediaItem: PathwayFragment_children_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: PathwayFragment_children_users | null;
  tags: PathwayFragment_children_tags[] | null;
  _deleted: boolean;
  sections: PathwayFragment_children_sections[] | null;
}

export interface PathwayFragment {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: PathwayFragment_image | null;
  id: string;
  icon: PathwayFragment_icon | null;
  itemType: string;
  mediaItem: PathwayFragment_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: PathwayFragment_users | null;
  tags: PathwayFragment_tags[] | null;
  _deleted: boolean;
  children: PathwayFragment_children[] | null;
}
