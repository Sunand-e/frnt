/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCourse
// ====================================================

export interface CreateCourse_createCourse_course_image {
  __typename: "Image";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface CreateCourse_createCourse_course_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface CreateCourse_createCourse_course_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface CreateCourse_createCourse_course {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  image: CreateCourse_createCourse_course_image | null;
  id: string;
  icon: CreateCourse_createCourse_course_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  tags: CreateCourse_createCourse_course_tags[] | null;
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
