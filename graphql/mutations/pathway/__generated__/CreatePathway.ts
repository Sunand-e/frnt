/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagInput } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreatePathway
// ====================================================

export interface CreatePathway_createPathway_pathway {
  __typename: "ContentItem";
  id: string;
}

export interface CreatePathway_createPathway {
  __typename: "CreatePathwayPayload";
  pathway: CreatePathway_createPathway_pathway | null;
}

export interface CreatePathway {
  createPathway: CreatePathway_createPathway | null;
}

export interface CreatePathwayVariables {
  title: string;
  content?: any | null;
  certificateProperties?: any | null;
  certificateTemplateId?: string | null;
  childrenIds?: any | null;
  settings?: any | null;
  tags?: TagInput[] | null;
  imageId?: string | null;
  imageUrl?: string | null;
}
