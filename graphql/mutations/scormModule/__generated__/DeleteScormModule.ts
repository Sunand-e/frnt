/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteScormModule
// ====================================================

export interface DeleteScormModule_deleteScormModule_scormModule {
  __typename: "ScormModule";
  id: string;
  _deleted: boolean;
}

export interface DeleteScormModule_deleteScormModule {
  __typename: "DeleteScormModulePayload";
  scormModule: DeleteScormModule_deleteScormModule_scormModule;
  message: string;
}

export interface DeleteScormModule {
  deleteScormModule: DeleteScormModule_deleteScormModule | null;
}

export interface DeleteScormModuleVariables {
  id: string;
}
