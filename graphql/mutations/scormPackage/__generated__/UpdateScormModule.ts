/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateScormPackage
// ====================================================

export interface UpdateScormPackage_updateScormPackage_scormModule {
  __typename: "ScormPackage";
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

export interface UpdateScormPackage_updateScormPackage {
  __typename: "UpdateScormPackagePayload";
  scormModule: UpdateScormPackage_updateScormPackage_scormModule;
}

export interface UpdateScormPackage {
  updateScormPackage: UpdateScormPackage_updateScormPackage | null;
}

export interface UpdateScormPackageVariables {
  id: string;
  title?: string | null;
}
