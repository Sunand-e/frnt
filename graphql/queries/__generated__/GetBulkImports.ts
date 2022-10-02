/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBulkImports
// ====================================================

export interface GetBulkImports_bulkImports_uploadedBy {
  __typename: "User";
  email: string;
  firstName: string | null;
  id: string;
}

export interface GetBulkImports_bulkImports_users {
  __typename: "User";
  email: string;
  firstName: string | null;
  id: string;
}

export interface GetBulkImports_bulkImports {
  __typename: "BulkImport";
  id: string;
  name: string | null;
  createdAt: any;
  updatedAt: any;
  uploadedBy: GetBulkImports_bulkImports_uploadedBy | null;
  users: GetBulkImports_bulkImports_users[] | null;
}

export interface GetBulkImports {
  bulkImports: GetBulkImports_bulkImports[];
}
