/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EnrolUsersInCourses
// ====================================================

export interface EnrolUsersInCourses_enrolUsersInContent {
  __typename: "EnrolUsersInContentPayload";
  status: string;
}

export interface EnrolUsersInCourses {
  enrolUsersInContent: EnrolUsersInCourses_enrolUsersInContent | null;
}

export interface EnrolUsersInCoursesVariables {
  userIds: string[];
  contentItemIds: string[];
}
