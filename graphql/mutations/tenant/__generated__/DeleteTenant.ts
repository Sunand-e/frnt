/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTenant
// ====================================================

export interface DeleteTenant_deleteTenant_tenant {
  __typename: "Tenant";
  id: string;
  _deleted: boolean;
}

export interface DeleteTenant_deleteTenant {
  __typename: "DeleteTenantPayload";
  tenant: DeleteTenant_deleteTenant_tenant;
  message: string;
}

export interface DeleteTenant {
  deleteTenant: DeleteTenant_deleteTenant | null;
}

export interface DeleteTenantVariables {
  id: string;
}
