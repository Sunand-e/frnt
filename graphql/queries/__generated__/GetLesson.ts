/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLesson
// ====================================================

export interface GetLesson_lesson_image {
  __typename: "MediaItem";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetLesson_lesson_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetLesson_lesson_mediaItem {
  __typename: "MediaItem";
  id: string;
  mediaType: string | null;
  location: string | null;
  fileName: string | null;
}

export interface GetLesson_lesson_users {
  __typename: "ContentUserConnection";
  totalCount: number;
}

export interface GetLesson_lesson_tags_image {
  __typename: "MediaItem";
  location: string | null;
}

export interface GetLesson_lesson_tags {
  __typename: "Tag";
  tagType: string;
  label: string;
  image: GetLesson_lesson_tags_image | null;
}

export interface GetLesson_lesson {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  settings: any | null;
  image: GetLesson_lesson_image | null;
  id: string;
  icon: GetLesson_lesson_icon | null;
  itemType: string;
  mediaItem: GetLesson_lesson_mediaItem | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  users: GetLesson_lesson_users | null;
  tags: GetLesson_lesson_tags[] | null;
  _deleted: boolean;
}

export interface GetLesson {
  /**
   * Get an lessons based on your conditions or based on id
   */
  lesson: GetLesson_lesson;
}

export interface GetLessonVariables {
  id: string;
}
