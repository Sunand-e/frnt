/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLibrary
// ====================================================

export interface GetLibrary_libraryItems {
  __typename: "ContentItem";
  title: string | null;
}

export interface GetLibrary {
  /**
   * Get list of all library_items
   */
  libraryItems: GetLibrary_libraryItems[];
}
