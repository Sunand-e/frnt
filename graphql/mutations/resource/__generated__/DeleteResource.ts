/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteResource
// ====================================================

export interface DeleteResource_deleteResource_contentItem {
  __typename: "ContentItem";
  id: string;
  _deleted: boolean;
}

export interface DeleteResource_deleteResource {
  __typename: "DeleteContentItemPayload";
  message: string;
  contentItem: DeleteResource_deleteResource_contentItem;
}

export interface DeleteResource {
  deleteResource: DeleteResource_deleteResource | null;
}

export interface DeleteResourceVariables {
  id: string;
}
