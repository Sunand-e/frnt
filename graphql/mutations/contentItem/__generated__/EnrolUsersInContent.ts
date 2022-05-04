/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EnrolUsersInContent
// ====================================================

export interface EnrolUsersInContent_enrolUsersInContent {
  __typename: "EnrolUsersInContentPayload";
  status: string;
}

export interface EnrolUsersInContent {
  enrolUsersInContent: EnrolUsersInContent_enrolUsersInContent | null;
}

export interface EnrolUsersInContentVariables {
  userIds: string[];
  contentItemIds: string[];
}
