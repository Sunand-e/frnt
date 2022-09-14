/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateScormModule
// ====================================================

export interface UpdateScormModule_updateScormModule_scormModule {
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

export interface UpdateScormModule_updateScormModule {
  __typename: "UpdateScormModulePayload";
  scormModule: UpdateScormModule_updateScormModule_scormModule;
}

export interface UpdateScormModule {
  updateScormModule: UpdateScormModule_updateScormModule | null;
}

export interface UpdateScormModuleVariables {
  id: string;
  title?: string | null;
}
