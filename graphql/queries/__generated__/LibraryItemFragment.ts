/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: LibraryItemFragment
// ====================================================

export interface LibraryItemFragment_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface LibraryItemFragment_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface LibraryItemFragment_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface LibraryItemFragment_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface LibraryItemFragment_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface LibraryItemFragment_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: LibraryItemFragment_tags_image | null;
}

export interface LibraryItemFragment {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: LibraryItemFragment_image | null;
  id: string;
  icon: LibraryItemFragment_icon | null;
  itemType: string;
  mediaItem: LibraryItemFragment_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: LibraryItemFragment_users | null;
  tags: LibraryItemFragment_tags[] | null;
  _deleted: boolean;
}
