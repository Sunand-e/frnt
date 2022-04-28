/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePathway
// ====================================================

export interface DeletePathway_deletePathway_contentItem {
  __typename: "ContentItem";
  id: string;
  _deleted: boolean;
}

export interface DeletePathway_deletePathway {
  __typename: "DeleteContentItemPayload";
  message: string;
  contentItem: DeletePathway_deletePathway_contentItem;
}

export interface DeletePathway {
  deletePathway: DeletePathway_deletePathway | null;
}

export interface DeletePathwayVariables {
  id: string;
}
