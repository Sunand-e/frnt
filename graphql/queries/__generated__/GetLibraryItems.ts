/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLibraryItems
// ====================================================

export interface GetLibraryItems_libraryItems_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetLibraryItems_libraryItems_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetLibraryItems_libraryItems_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetLibraryItems_libraryItems {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetLibraryItems_libraryItems_image | null;
  id: string;
  icon: GetLibraryItems_libraryItems_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetLibraryItems_libraryItems_users | null;
  _deleted: boolean;
}

export interface GetLibraryItems {
  /**
   * Get list of all library_items
   */
  libraryItems: GetLibraryItems_libraryItems[];
}
