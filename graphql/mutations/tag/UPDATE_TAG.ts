import { gql } from '@apollo/client';
import { TagFragment } from '../../queries/tags';

export const UPDATE_TAG = gql`
  mutation UpdateTag(
    $id: ID!
    $label: String,
    $tagType: String,
    $mediaItemId: ID,
  ) {
    updateTag(
      input: {
        id: $id,
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
