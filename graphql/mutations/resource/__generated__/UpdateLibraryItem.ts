/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateLibraryItem
// ====================================================

export interface UpdateLibraryItem_updateLibraryItem_libraryItem_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UpdateLibraryItem_updateLibraryItem_libraryItem_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface UpdateLibraryItem_updateLibraryItem_libraryItem_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface UpdateLibraryItem_updateLibraryItem_libraryItem_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface UpdateLibraryItem_updateLibraryItem_libraryItem_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface UpdateLibraryItem_updateLibraryItem_libraryItem_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: UpdateLibraryItem_updateLibraryItem_libraryItem_tags_image | null;
}

export interface UpdateLibraryItem_updateLibraryItem_libraryItem {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: UpdateLibraryItem_updateLibraryItem_libraryItem_image | null;
  id: string;
  icon: UpdateLibraryItem_updateLibraryItem_libraryItem_icon | null;
  itemType: string;
  mediaItem: UpdateLibraryItem_updateLibraryItem_libraryItem_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: UpdateLibraryItem_updateLibraryItem_libraryItem_users | null;
  tags: UpdateLibraryItem_updateLibraryItem_libraryItem_tags[] | null;
  _deleted: boolean;
}

export interface UpdateLibraryItem_updateLibraryItem {
  __typename: "UpdateLibraryItemPayload";
  libraryItem: UpdateLibraryItem_updateLibraryItem_libraryItem | null;
}

export interface UpdateLibraryItem {
  updateLibraryItem: UpdateLibraryItem_updateLibraryItem | null;
}

export interface UpdateLibraryItemVariables {
  id: string;
  title?: string | null;
  content?: any | null;
  settings?: any | null;
  imageId?: string | null;
  mediaItemId?: string | null;
}
