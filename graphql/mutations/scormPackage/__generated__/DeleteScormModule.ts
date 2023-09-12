/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteScormPackage
// ====================================================

export interface DeleteScormPackage_deleteScormPackage_scormModule {
  __typename: "ScormPackage";
  id: string;
  _deleted: boolean;
}

export interface DeleteScormPackage_deleteScormPackage {
  __typename: "DeleteScormPackagePayload";
  scormModule: DeleteScormPackage_deleteScormPackage_scormModule;
  usage: any[];
  success: boolean;
  message: string;
}

export interface DeleteScormPackage {
  deleteScormPackage: DeleteScormPackage_deleteScormPackage | null;
}

export interface DeleteScormPackageVariables {
  id: string;
}
