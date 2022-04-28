/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EnrolUsersInCourses
// ====================================================

export interface EnrolUsersInCourses_enrolUsersInCourses {
  __typename: "EnrolUsersInCoursesPayload";
  status: string;
}

export interface EnrolUsersInCourses {
  enrolUsersInCourses: EnrolUsersInCourses_enrolUsersInCourses | null;
}

export interface EnrolUsersInCoursesVariables {
  userIds: string[];
  contentItemIds: string[];
}
