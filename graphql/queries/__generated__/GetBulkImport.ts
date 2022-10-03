/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBulkImport
// ====================================================

export interface GetBulkImport_bulkImport_uploadedBy {
  __typename: "User";
  email: string;
  firstName: string | null;
  id: string;
}

export interface GetBulkImport_bulkImport_users {
  __typename: "User";
  email: string;
  firstName: string | null;
  id: string;
}

export interface GetBulkImport_bulkImport {
  __typename: "BulkImport";
  id: string;
  name: string | null;
  createdAt: any;
  updatedAt: any;
  uploadedBy: GetBulkImport_bulkImport_uploadedBy | null;
  users: GetBulkImport_bulkImport_users[] | null;
}

export interface GetBulkImport {
  bulkImport: GetBulkImport_bulkImport;
}

export interface GetBulkImportVariables {
  id: string;
}
