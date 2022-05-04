/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteTag
// ====================================================

export interface DeleteTag_deleteTag_tag {
  __typename: "Tag";
  id: string;
  _deleted: boolean;
}

export interface DeleteTag_deleteTag {
  __typename: "DeleteTagPayload";
  tag: DeleteTag_deleteTag_tag;
  message: string;
}

export interface DeleteTag {
  deleteTag: DeleteTag_deleteTag | null;
}

export interface DeleteTagVariables {
  id: string;
}
