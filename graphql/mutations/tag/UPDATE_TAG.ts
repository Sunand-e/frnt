import { gql } from '@apollo/client';
import { TagFragment } from '../../queries/tags';

export const UPDATE_TAG = gql`
  mutation UpdateTag(
    $id: ID!
    $parentId: ID
    $label: String,
    $tagType: String,
    $mediaItemId: ID,
  ) {
    updateTag(
      input: {
        id: $id,
        parentId: $parentId,
        label: $label,
        tagType: $tagType,
        mediaItemId: $mediaItemId,
      }
    ) {
      tag {
      ...TagFragment
      }
    }
  }
  ${TagFragment}
`;
