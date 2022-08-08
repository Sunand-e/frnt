/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateTenant
// ====================================================

export interface CreateTenant_createTenant_tenant {
  __typename: "Tenant";
  id: string;
  name: string;
  url: string;
  updatedAt: any;
  createdAt: any;
  shortName: string;
  settings: any;
}

export interface CreateTenant_createTenant {
  __typename: "CreateTenantPayload";
  tenant: CreateTenant_createTenant_tenant;
}

export interface CreateTenant {
  createTenant: CreateTenant_createTenant | null;
}

export interface CreateTenantVariables {
  name: string;
  shortName: string;
  parentId?: string | null;
  settings?: any | null;
  url: string;
}
