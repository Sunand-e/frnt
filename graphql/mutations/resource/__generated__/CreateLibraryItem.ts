/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateLibraryItem
// ====================================================

export interface CreateLibraryItem_createLibraryItem_libraryItem_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface CreateLibraryItem_createLibraryItem_libraryItem_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface CreateLibraryItem_createLibraryItem_libraryItem_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface CreateLibraryItem_createLibraryItem_libraryItem_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface CreateLibraryItem_createLibraryItem_libraryItem_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface CreateLibraryItem_createLibraryItem_libraryItem_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: CreateLibraryItem_createLibraryItem_libraryItem_tags_image | null;
}

export interface CreateLibraryItem_createLibraryItem_libraryItem {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  shared: boolean;
  image: CreateLibraryItem_createLibraryItem_libraryItem_image | null;
  id: string;
  icon: CreateLibraryItem_createLibraryItem_libraryItem_icon | null;
  itemType: string;
  mediaItem: CreateLibraryItem_createLibraryItem_libraryItem_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: CreateLibraryItem_createLibraryItem_libraryItem_users | null;
  tags: CreateLibraryItem_createLibraryItem_libraryItem_tags[] | null;
  _deleted: boolean;
}

export interface CreateLibraryItem_createLibraryItem {
  __typename: "CreateLibraryItemPayload";
  libraryItem: CreateLibraryItem_createLibraryItem_libraryItem | null;
  message: any;
}

export interface CreateLibraryItem {
  createLibraryItem: CreateLibraryItem_createLibraryItem | null;
}

export interface CreateLibraryItemVariables {
  title?: string | null;
  contentType?: string | null;
  content?: any | null;
  settings?: any | null;
  imageId?: string | null;
  mediaItemId?: string | null;
  iconId?: string | null;
}
