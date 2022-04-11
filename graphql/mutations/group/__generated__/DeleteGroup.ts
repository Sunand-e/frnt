/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteGroup
// ====================================================

export interface DeleteGroup_deleteGroup_group {
  __typename: "Group";
  id: string;
  _deleted: boolean;
}

export interface DeleteGroup_deleteGroup {
  __typename: "DeleteGroupPayload";
  group: DeleteGroup_deleteGroup_group;
  message: string;
}

export interface DeleteGroup {
  deleteGroup: DeleteGroup_deleteGroup | null;
}

export interface DeleteGroupVariables {
  id: string;
}
