/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLibraryItem
// ====================================================

export interface GetLibraryItem_libraryItem {
  __typename: "ContentItem";
  id: string;
}

export interface GetLibraryItem {
  /**
   * Get an library_items based on your conditions or based on id
   */
  libraryItem: GetLibraryItem_libraryItem[];
}
