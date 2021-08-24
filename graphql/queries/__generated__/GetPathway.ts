/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetPathway
// ====================================================

export interface GetPathway_pathway_image {
  __typename: "Image";
  location: string | null;
  id: string;
  altText: string | null;
  properties: any | null;
  title: string | null;
}

export interface GetPathway_pathway_icon {
  __typename: "Icon";
  provider: string | null;
  properties: any | null;
  id: string;
}

export interface GetPathway_pathway_tags {
  __typename: "Tag";
  id: string;
  label: string;
  tagType: string;
}

export interface GetPathway_pathway {
  __typename: "ContentItem";
  content: any | null;
  contentType: string | null;
  createdAt: any;
  image: GetPathway_pathway_image | null;
  id: string;
  icon: GetPathway_pathway_icon | null;
  itemType: string;
  order: number | null;
  prerequisites: any | null;
  title: string | null;
  updatedAt: any;
  tags: GetPathway_pathway_tags[] | null;
}

export interface GetPathway {
  /**
   * Get an pathways based on your conditions or based on id
   */
  pathway: GetPathway_pathway[];
}

export interface GetPathwayVariables {
  id: string;
}
