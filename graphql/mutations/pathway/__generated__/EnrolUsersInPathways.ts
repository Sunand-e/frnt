/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EnrolUsersInPathways
// ====================================================

export interface EnrolUsersInPathways_enrolUsersInContent {
  __typename: "EnrolUsersInContentPayload";
  status: string;
}

export interface EnrolUsersInPathways {
  enrolUsersInContent: EnrolUsersInPathways_enrolUsersInContent | null;
}

export interface EnrolUsersInPathwaysVariables {
  userIds: string[];
  contentItemIds: string[];
}
