/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPathways
// ====================================================

export interface GetPathways_pathways_image {
  __typename: "Image";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetPathways_pathways_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetPathways_pathways_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface GetPathways_pathways {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  image: GetPathways_pathways_image | null;
  id: string;
  icon: GetPathways_pathways_icon | null;
  itemType: string;
  order: number | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  tags: GetPathways_pathways_tags[] | null;
}

export interface GetPathways {
  /**
   * Get list of all pathways
   */
  pathways: GetPathways_pathways[];
}
