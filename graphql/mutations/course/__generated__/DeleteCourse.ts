/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteCourse
// ====================================================

export interface DeleteCourse_deleteCourse_contentItem {
  __typename: "ContentItem";
  id: string;
  _deleted: boolean;
}

export interface DeleteCourse_deleteCourse {
  __typename: "DeleteContentItemPayload";
  message: string;
  contentItem: DeleteCourse_deleteCourse_contentItem;
}

export interface DeleteCourse {
  deleteCourse: DeleteCourse_deleteCourse | null;
}

export interface DeleteCourseVariables {
  id: string;
}
