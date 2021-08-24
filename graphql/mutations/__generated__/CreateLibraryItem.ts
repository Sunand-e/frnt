/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateLibraryItem
// ====================================================

export interface CreateLibraryItem_createLibraryItem_libraryItem {
  __typename: "ContentItem";
  id: string;
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
  title: string;
  contentType?: string | null;
  content?: any | null;
  childrenIds?: any | null;
  imageId?: string | null;
  iconId?: string | null;
}
