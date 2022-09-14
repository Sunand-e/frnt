/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveEnrolledContents
// ====================================================

export interface RemoveEnrolledContents_removeEnrolledContents {
  __typename: "RemoveEnrolledCoursePayload";
  status: string;
}

export interface RemoveEnrolledContents {
  removeEnrolledContents: RemoveEnrolledContents_removeEnrolledContents | null;
}

export interface RemoveEnrolledContentsVariables {
  contentItemId: string;
  userId: string;
  roleIds?: string[] | null;
}
