/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLibraryItem
// ====================================================

export interface GetLibraryItem_libraryItem_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetLibraryItem_libraryItem_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetLibraryItem_libraryItem_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetLibraryItem_libraryItem {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetLibraryItem_libraryItem_image | null;
  id: string;
  icon: GetLibraryItem_libraryItem_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetLibraryItem_libraryItem_users | null;
  _deleted: boolean;
}

export interface GetLibraryItem {
  /**
   * Get an library_items based on your conditions or based on id
   */
  libraryItem: GetLibraryItem_libraryItem;
}

export interface GetLibraryItemVariables {
  id: string;
}
