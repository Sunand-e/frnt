import { gql } from '@apollo/client';
import { TagFragment } from '../../queries/tags';


export const CREATE_TAG = gql`
  mutation CreateTag(
    $label: String!,
    $tagType: String!,
  ) {
    createTag(
      input: {
        label: $label,
        tagType: $tagType,
      }
    ) {
      tag {
        ...TagFragment
      }
    }
  }
  ${TagFragment}
`;
