/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteCourse
// ====================================================

export interface DeleteCourse_deleteCourse {
  __typename: "DeleteContentItemPayload";
  message: string;
}

export interface DeleteCourse {
  deleteCourse: DeleteCourse_deleteCourse | null;
}

export interface DeleteCourseVariables {
  id: string;
}
