/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetScormModules
// ====================================================

export interface GetScormModules_scormModules {
  __typename: "ScormModule";
  id: string;
  createdAt: any;
  launchUrl: string | null;
  manifestData: any | null;
  title: string | null;
  updatedAt: any;
  deletedAt: any | null;
  contentType: string | null;
}

export interface GetScormModules {
  /**
   * Get List of SCORM modules present in current Tenant
   */
  scormModules: GetScormModules_scormModules[];
}

export interface GetScormModulesVariables {
  where?: any | null;
}
