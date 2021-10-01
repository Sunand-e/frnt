/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCourse
// ====================================================

export interface UpdateCourse_updateCourse_course_image {
  __typename: "Image";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UpdateCourse_updateCourse_course_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface UpdateCourse_updateCourse_course_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface UpdateCourse_updateCourse_course {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  image: UpdateCourse_updateCourse_course_image | null;
  id: string;
  icon: UpdateCourse_updateCourse_course_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  _deleted: boolean;
  tags: UpdateCourse_updateCourse_course_tags[] | null;
}

export interface UpdateCourse_updateCourse {
  __typename: "UpdateCoursePayload";
  course: UpdateCourse_updateCourse_course | null;
}

export interface UpdateCourse {
  updateCourse: UpdateCourse_updateCourse | null;
}

export interface UpdateCourseVariables {
  id: string;
  title?: string | null;
  content?: any | null;
  certificateProperties?: any | null;
  childrenIds?: any | null;
  prerequisites?: any | null;
}
