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

export interface CreateLibraryItem_createLibraryItem_libraryItem {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: CreateLibraryItem_createLibraryItem_libraryItem_image | null;
  id: string;
  icon: CreateLibraryItem_createLibraryItem_libraryItem_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
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
  iconId?: string | null;
}
