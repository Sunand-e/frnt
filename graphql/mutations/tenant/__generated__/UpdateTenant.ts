/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateTenant
// ====================================================

export interface UpdateTenant_updateTenant_tenant {
  __typename: "Tenant";
  id: string;
  name: string;
  url: string;
  updatedAt: any;
}

export interface UpdateTenant_updateTenant {
  __typename: "UpdateTenantPayload";
  tenant: UpdateTenant_updateTenant_tenant;
}

export interface UpdateTenant {
  updateTenant: UpdateTenant_updateTenant | null;
}

export interface UpdateTenantVariables {
  id: string;
  name?: string | null;
  shortName?: string | null;
  parentId?: string | null;
  settings?: any | null;
  url?: string | null;
}
