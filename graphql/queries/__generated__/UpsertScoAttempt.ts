/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpsertScoAttempt
// ====================================================

export interface UpsertScoAttempt_upsertScoAttempt {
  __typename: "ScoAttempt";
  id: string;
  data: any | null;
}

export interface UpsertScoAttempt {
  upsertScoAttempt: UpsertScoAttempt_upsertScoAttempt | null;
}

export interface UpsertScoAttemptVariables {
  data: any;
  attempt: number;
  contentItemId: string;
  scormPackageId: string;
}
