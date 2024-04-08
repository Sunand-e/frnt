import { gql } from '@apollo/client';
import { TagFragment } from '../../queries/tags';


export const CREATE_TAG = gql`
  mutation CreateTag(
    $label: String!,
    $tagType: String!,
    $mediaItemId: ID,
    $parentId: ID,
  ) {
    createTag(
      input: {
        label: $label,
        tagType: $tagType,
        mediaItemId: $mediaItemId,
        parentId: $parentId,
      }
    ) {
      tag {
        ...TagFragment
      }
    }
  }
  ${TagFragment}
`;
