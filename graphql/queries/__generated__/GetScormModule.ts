/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetScormModule
// ====================================================

export interface GetScormModule_scormPackage {
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

export interface GetScormModule {
  /**
   * Get a SCORM module present in current Tenant based on the id
   */
  scormPackage: GetScormModule_scormPackage;
}

export interface GetScormModuleVariables {
  id?: string | null;
}
