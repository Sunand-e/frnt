import { gql } from '@apollo/client';
import { TagFragment } from '../../queries/tags';


export const CREATE_TAG = gql`
  mutation CreateTag(
    $label: String!,
    $tagType: String!,
    $mediaItemId: ID,
  ) {
    createTag(
      input: {
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
