/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateLesson
// ====================================================

export interface UpdateLesson_updateLesson_lesson_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface UpdateLesson_updateLesson_lesson_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface UpdateLesson_updateLesson_lesson_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface UpdateLesson_updateLesson_lesson_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface UpdateLesson_updateLesson_lesson_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: UpdateLesson_updateLesson_lesson_tags_image | null;
}

export interface UpdateLesson_updateLesson_lesson {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: UpdateLesson_updateLesson_lesson_image | null;
  id: string;
  icon: UpdateLesson_updateLesson_lesson_icon | null;
  itemType: string;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: UpdateLesson_updateLesson_lesson_users | null;
  tags: UpdateLesson_updateLesson_lesson_tags[] | null;
  _deleted: boolean;
}

export interface UpdateLesson_updateLesson {
  __typename: "UpdateLessonPayload";
  lesson: UpdateLesson_updateLesson_lesson | null;
}

export interface UpdateLesson {
  updateLesson: UpdateLesson_updateLesson | null;
}

export interface UpdateLessonVariables {
  id: string;
  title?: string | null;
  content?: any | null;
  contentType?: string | null;
  scormId?: string | null;
  childrenIds?: any | null;
  prerequisites?: any | null;
}
