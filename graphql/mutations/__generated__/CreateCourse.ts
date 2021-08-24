/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCourse
// ====================================================

export interface CreateCourse_createCourse_course {
  __typename: "ContentItem";
  id: string;
  title: string | null;
  createdAt: any;
  updatedAt: any;
  _deleted: boolean;
}

export interface CreateCourse_createCourse {
  __typename: "CreateCoursePayload";
  course: CreateCourse_createCourse_course | null;
  message: any;
}

export interface CreateCourse {
  createCourse: CreateCourse_createCourse | null;
}

export interface CreateCourseVariables {
  title: string;
  content?: any | null;
  certificateProperties?: any | null;
  certificateTemplateId?: string | null;
  childrenIds?: any | null;
  prerequisites?: any | null;
}
