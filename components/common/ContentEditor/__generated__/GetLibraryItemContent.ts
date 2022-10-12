/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLibraryItemContent
// ====================================================

export interface GetLibraryItemContent_libraryItem {
  __typename: "ContentItem";
  content: any | null;
}

export interface GetLibraryItemContent {
  /**
   * Get an library_items based on your conditions or based on id
   */
  libraryItem: GetLibraryItemContent_libraryItem;
}

export interface GetLibraryItemContentVariables {
  id: string;
}
