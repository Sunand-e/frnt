/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetScormModules
// ====================================================

export interface GetScormModules_scormPackages {
  __typename: "ScormModule";
  id: string;
  createdAt: any;
  launchUrl: string | null;
  manifestData: any | null;
  title: string | null;
  updatedAt: any;
  deletedAt: any | null;
  contentType: string | null;
  _deleted: boolean;
}

export interface GetScormModules {
  /**
   * Get List of SCORM modules present in current Tenant
   */
  scormPackages: GetScormModules_scormPackages[];
}

export interface GetScormModulesVariables {
  where?: any | null;
}
