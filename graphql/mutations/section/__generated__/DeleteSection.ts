/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteSection
// ====================================================

export interface DeleteSection_deleteSection {
  __typename: "DeleteContentItemPayload";
  message: string;
}

export interface DeleteSection {
  deleteSection: DeleteSection_deleteSection | null;
}

export interface DeleteSectionVariables {
  id: string;
}
