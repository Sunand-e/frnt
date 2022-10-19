/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteLibraryItem
// ====================================================

export interface DeleteLibraryItem_deleteLibraryItem_contentItem {
  __typename: "ContentItem";
  id: string;
  _deleted: boolean;
}

export interface DeleteLibraryItem_deleteLibraryItem {
  __typename: "DeleteContentItemPayload";
  message: string;
  contentItem: DeleteLibraryItem_deleteLibraryItem_contentItem;
}

export interface DeleteLibraryItem {
  deleteLibraryItem: DeleteLibraryItem_deleteLibraryItem | null;
}

export interface DeleteLibraryItemVariables {
  id: string;
}
