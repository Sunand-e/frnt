/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SectionFragment
// ====================================================

export interface SectionFragment_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface SectionFragment_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface SectionFragment_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface SectionFragment_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface SectionFragment_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface SectionFragment_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: SectionFragment_tags_image | null;
}

export interface SectionFragment_children_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface SectionFragment_children_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface SectionFragment_children_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface SectionFragment_children_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface SectionFragment_children_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface SectionFragment_children_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: SectionFragment_children_tags_image | null;
}

export interface SectionFragment_children {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: SectionFragment_children_image | null;
  id: string;
  icon: SectionFragment_children_icon | null;
  itemType: string;
  mediaItem: SectionFragment_children_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: SectionFragment_children_users | null;
  tags: SectionFragment_children_tags[] | null;
  _deleted: boolean;
}

export interface SectionFragment {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: SectionFragment_image | null;
  id: string;
  icon: SectionFragment_icon | null;
  itemType: string;
  mediaItem: SectionFragment_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: SectionFragment_users | null;
  tags: SectionFragment_tags[] | null;
  _deleted: boolean;
  children: SectionFragment_children[] | null;
}
