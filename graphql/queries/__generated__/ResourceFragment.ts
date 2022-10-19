/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ResourceFragment
// ====================================================

export interface ResourceFragment_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface ResourceFragment_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface ResourceFragment_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface ResourceFragment_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface ResourceFragment_tags_image {
  __typename: "MediaItem";
  id: string;
  location: string | null;
}

export interface ResourceFragment_tags {
  __typename: "Tag";
  id: string;
  tagType: string;
  label: string;
  image: ResourceFragment_tags_image | null;
}

export interface ResourceFragment {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: ResourceFragment_image | null;
  id: string;
  icon: ResourceFragment_icon | null;
  itemType: string;
  mediaItem: ResourceFragment_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: ResourceFragment_users | null;
  tags: ResourceFragment_tags[] | null;
  _deleted: boolean;
}
