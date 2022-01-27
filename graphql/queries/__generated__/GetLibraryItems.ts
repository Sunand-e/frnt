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

export interface GetLibraryItems_libraryItems_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface GetLibraryItems_libraryItems {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  image: GetLibraryItems_libraryItems_image | null;
  id: string;
  icon: GetLibraryItems_libraryItems_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  tags: GetLibraryItems_libraryItems_tags[] | null;
}

export interface GetLibraryItems {
  /**
   * Get list of all library_items
   */
  libraryItems: GetLibraryItems_libraryItems[];
}
