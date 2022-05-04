/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RemoveUserFromGroup
// ====================================================

export interface RemoveUserFromGroup_removeUserFromGroup_membership_user {
  __typename: "User";
  fullName: string | null;
}

export interface RemoveUserFromGroup_removeUserFromGroup_membership {
  __typename: "GroupMembership";
  user: RemoveUserFromGroup_removeUserFromGroup_membership_user | null;
}

export interface RemoveUserFromGroup_removeUserFromGroup {
  __typename: "RemoveUserFromGroupPayload";
  membership: RemoveUserFromGroup_removeUserFromGroup_membership;
}

export interface RemoveUserFromGroup {
  removeUserFromGroup: RemoveUserFromGroup_removeUserFromGroup | null;
}

export interface RemoveUserFromGroupVariables {
  userId: string;
  groupId: string;
}
