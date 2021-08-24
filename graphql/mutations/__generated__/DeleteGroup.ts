/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteGroup
// ====================================================

export interface DeleteGroup_deleteGroup {
  __typename: "DeleteGroupPayload";
  message: string;
}

export interface DeleteGroup {
  deleteGroup: DeleteGroup_deleteGroup | null;
}

export interface DeleteGroupVariables {
  id: string;
}
