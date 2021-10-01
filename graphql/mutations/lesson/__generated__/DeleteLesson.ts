/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteLesson
// ====================================================

export interface DeleteLesson_deleteLesson {
  __typename: "DeleteContentItemPayload";
  message: string;
}

export interface DeleteLesson {
  deleteLesson: DeleteLesson_deleteLesson | null;
}

export interface DeleteLessonVariables {
  id: string;
}
